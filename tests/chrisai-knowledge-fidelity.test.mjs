import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  evaluateAgentWorkspace,
  failureCodes
} from './helpers/chrisai-knowledge-fidelity.mjs';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const fixtureRoot = join(
  repoRoot,
  'tests',
  'fixtures',
  'chrisai-knowledge-fidelity'
);
const docxGenerator = join(fixtureRoot, 'generate_mock_docx.py');
const pythonExecutable = process.env.PYTHON
  || (process.platform === 'win32' ? 'python' : 'python3');

async function write(projectRoot, path, content) {
  const destination = join(projectRoot, ...path.split('/'));
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
  return destination;
}

async function copy(projectRoot, source, destination) {
  const from = join(projectRoot, ...source.split('/'));
  const to = join(projectRoot, ...destination.split('/'));
  await mkdir(dirname(to), { recursive: true });
  await copyFile(from, to);
}

function assertPass(report) {
  assert.equal(report.ok, true, JSON.stringify(report.failures, null, 2));
  assert.equal(report.metrics.unacceptableLoss, 0);
  assert.equal(report.metrics.semanticRecall, 1);
}

function assertFailure(report, code, id) {
  assert.equal(report.ok, false);
  assert.ok(failureCodes(report).includes(code), JSON.stringify(report, null, 2));
  if (id) {
    assert.ok(
      report.failures.some((failure) =>
        failure.code === code && failure.id === id
      ),
      JSON.stringify(report, null, 2)
    );
  }
}

function researchFact(index) {
  const id = `RES-${String(index).padStart(3, '0')}`;
  return {
    id,
    decision: `route-${index}-is-approved`,
    constraint: `limit-${index}-must-hold`,
    edgeCase: `outage-${index}-uses-manual-review`
  };
}

function researchBlock(fact) {
  return [
    `## [${fact.id}]`,
    `- Decision: ${fact.decision}.`,
    `- Constraint: ${fact.constraint}.`,
    `- Evidence: interview-${fact.id} and experiment-${fact.id}.`,
    `- Edge case: ${fact.edgeCase}.`,
    `- Example: example-${fact.id} remains normative.`,
    ''
  ].join('\n');
}

test('creation measures loss across a routed document completed before splitting', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'agents-fidelity-create-'));

  try {
    const facts = Array.from({ length: 72 }, (_, index) =>
      researchFact(index + 1)
    );
    const blocks = facts.map(researchBlock);
    const completeDraft = `# Complete research draft\n\n${blocks.join('\n')}`;
    assert.ok(completeDraft.split('\n').length > 500);
    await write(projectRoot, 'working/complete-research.md', completeDraft);

    await write(
      projectRoot,
      '.agents/context/index.md',
      '# Context\n\n'
        + '- [Research decisions and evidence; load when working on routing]'
        + '(research.md)\n'
    );
    await write(
      projectRoot,
      '.agents/context/research.md',
      '# Research router\n\n'
        + '- [Findings RES-001 through RES-024 with decisions, constraints, '
        + 'and edge cases; load when working on early routing]'
        + '(../references/00001-research-early.md)\n'
        + '- [Findings RES-025 through RES-048 with decisions, constraints, '
        + 'and edge cases; load when working on middle routing]'
        + '(../references/00002-research-middle.md)\n'
        + '- [Findings RES-049 through RES-072 with decisions, constraints, '
        + 'and edge cases; load when working on late routing]'
        + '(../references/00003-research-late.md)\n'
    );

    for (let index = 0; index < 3; index += 1) {
      const first = index * 24;
      await write(
        projectRoot,
        `.agents/references/0000${index + 1}-research-${[
          'early',
          'middle',
          'late'
        ][index]}.md`,
        `# Research partition ${index + 1}\n\n`
          + blocks.slice(first, first + 24).join('\n')
      );
    }

    const contract = {
      requiredClaims: facts.map((fact) => ({
        id: fact.id,
        terms: [
          `[${fact.id}]`,
          fact.decision,
          fact.constraint,
          fact.edgeCase
        ]
      })),
      routes: [
        {
          id: 'CREATE-ROUTE-01',
          from: '.agents/context/research.md',
          to: '.agents/references/00001-research-early.md',
          descriptionTerms: ['decisions', 'constraints', 'load when']
        },
        {
          id: 'CREATE-ROUTE-02',
          from: '.agents/context/research.md',
          to: '.agents/references/00002-research-middle.md',
          descriptionTerms: ['decisions', 'edge cases', 'load when']
        },
        {
          id: 'CREATE-ROUTE-03',
          from: '.agents/context/research.md',
          to: '.agents/references/00003-research-late.md',
          descriptionTerms: ['constraints', 'edge cases', 'load when']
        }
      ]
    };

    const complete = await evaluateAgentWorkspace(projectRoot, contract);
    assertPass(complete);
    assert.equal(complete.metrics.requiredClaims, 72);

    const middlePath = '.agents/references/00002-research-middle.md';
    const middle = await readFile(join(projectRoot, middlePath), 'utf8');
    await write(projectRoot, middlePath, middle.replace(researchBlock(facts[41]), ''));

    const lossy = await evaluateAgentWorkspace(projectRoot, contract);
    assertFailure(lossy, 'missing-required-claim', 'RES-042');
    assert.equal(lossy.metrics.unacceptableLoss, 1);
  } finally {
    await rm(projectRoot, { force: true, recursive: true });
  }
});

test('wireframe ingestion preserves the archive and reconstruction contract', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'agents-fidelity-wireframe-'));

  try {
    const sourceRoot = 'wireframes/r001-documents';
    const archivedRoot = '.agents/resources/wireframes/r001-documents';
    const sourceFiles = {
      'specs.md': '# Documents revision\n\n'
        + '- [WF-SCREEN-01] The Documents directory shows source type and mapping readiness.\n'
        + '- [WF-STATE-01] Image-only PDFs are blocked until OCR provides readable text.\n'
        + '- [WF-FLOW-01] Generation requires one eligible response for each required linked Form.\n'
        + '- [WF-DEFER-01] Production storage, antivirus scanning, and OCR are deferred.\n',
      'notes.md': '# Review history\n\n'
        + '- [WF-REVIEW-01] Review round 2 was approved on 2026-08-17.\n'
        + '- [WF-HISTORY-01] Review round 2 removed Document counts from the Forms directory.\n',
      'documents.html': '<!doctype html>\n'
        + '<button data-contract="WF-INTERACTION-01">Generate document</button>\n',
      'app.js': 'const currentResponsePreselected = true; // WF-INTERACTION-01\n',
      'styles.css': '.documents { display: grid; }\n'
    };

    for (const [path, content] of Object.entries(sourceFiles)) {
      await write(projectRoot, `${sourceRoot}/${path}`, content);
      await copy(
        projectRoot,
        `${sourceRoot}/${path}`,
        `${archivedRoot}/${path}`
      );
    }

    await write(
      projectRoot,
      '.agents/context/index.md',
      '# Context\n\n'
        + '- [Documents product rules and routed wireframe detail; load when '
        + 'implementing Documents](documents.md)\n'
    );
    await write(
      projectRoot,
      '.agents/context/documents.md',
      '# Documents\n\n'
        + '- [WF-SCREEN-01] The Documents directory shows source type and mapping readiness.\n'
        + '- [WF-DEFER-01] Production storage, antivirus scanning, and OCR are deferred.\n\n'
        + '- [Detailed screens, states, and generation interactions; load when '
        + 'implementing the Documents experience]'
        + '(../references/00001-documents-interactions.md)\n'
        + '- [Approval and revision decisions; load when reviewing why the '
        + 'current Documents design changed]'
        + '(../references/00002-documents-history.md)\n'
    );
    await write(
      projectRoot,
      '.agents/references/00001-documents-interactions.md',
      '# Documents interactions\n\n'
        + '- [WF-STATE-01] Image-only PDFs are blocked until OCR provides readable text.\n'
        + '- [WF-FLOW-01] Generation requires one eligible response for each required linked Form.\n'
        + '- [WF-INTERACTION-01] Generate document keeps the current Form response preselected.\n'
    );
    const historyPath = '.agents/references/00002-documents-history.md';
    await write(
      projectRoot,
      historyPath,
      '# Documents decision history\n\n'
        + '- [WF-REVIEW-01] Review round 2 was approved on 2026-08-17.\n'
        + '- [WF-HISTORY-01] Review round 2 removed Document counts from the Forms directory.\n'
    );

    const contract = {
      requiredClaims: [
        { id: 'WF-SCREEN-01', terms: ['[WF-SCREEN-01]', 'source type', 'mapping readiness'] },
        { id: 'WF-STATE-01', terms: ['[WF-STATE-01]', 'image-only PDFs', 'blocked', 'OCR'] },
        { id: 'WF-FLOW-01', terms: ['[WF-FLOW-01]', 'one eligible response', 'required linked Form'] },
        { id: 'WF-DEFER-01', terms: ['[WF-DEFER-01]', 'production storage', 'deferred'] },
        { id: 'WF-INTERACTION-01', terms: ['[WF-INTERACTION-01]', 'Generate document', 'preselected'] },
        { id: 'WF-REVIEW-01', terms: ['[WF-REVIEW-01]', 'round 2', 'approved'] },
        { id: 'WF-HISTORY-01', terms: ['[WF-HISTORY-01]', 'removed', 'Document counts', 'Forms directory'] }
      ],
      exactCopies: Object.keys(sourceFiles).map((path) => ({
        id: `WF-RAW-${path}`,
        source: `${sourceRoot}/${path}`,
        archived: `${archivedRoot}/${path}`
      })),
      routes: [
        {
          id: 'WF-ROUTE-INTERACTIONS',
          from: '.agents/context/documents.md',
          to: '.agents/references/00001-documents-interactions.md',
          descriptionTerms: ['screens', 'interactions', 'load when']
        },
        {
          id: 'WF-ROUTE-HISTORY',
          from: '.agents/context/documents.md',
          to: historyPath,
          descriptionTerms: ['approval', 'decisions', 'load when']
        }
      ]
    };

    assertPass(await evaluateAgentWorkspace(projectRoot, contract));

    await write(
      projectRoot,
      `${archivedRoot}/app.js`,
      `${sourceFiles['app.js']}// archive was changed\n`
    );
    assertFailure(
      await evaluateAgentWorkspace(projectRoot, contract),
      'raw-source-mismatch',
      'WF-RAW-app.js'
    );
    await write(projectRoot, `${archivedRoot}/app.js`, sourceFiles['app.js']);

    const history = await readFile(join(projectRoot, historyPath), 'utf8');
    await write(
      projectRoot,
      historyPath,
      history.replace(/- \[WF-HISTORY-01\].*\n/, '')
    );
    assertFailure(
      await evaluateAgentWorkspace(projectRoot, contract),
      'missing-required-claim',
      'WF-HISTORY-01'
    );
  } finally {
    await rm(projectRoot, { force: true, recursive: true });
  }
});

test('DOCX ingestion preserves the binary and meaning-bearing document data', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'agents-fidelity-docx-'));

  try {
    const source = 'incoming/payroll-export-policy.docx';
    const archived = '.agents/resources/documents/payroll-export-policy.docx';
    const sourcePath = join(projectRoot, ...source.split('/'));
    await mkdir(dirname(sourcePath), { recursive: true });

    const generated = spawnSync(
      pythonExecutable,
      [docxGenerator, 'create', sourcePath],
      { cwd: repoRoot, encoding: 'utf8' }
    );
    assert.equal(generated.status, 0, generated.stderr);
    const inspected = spawnSync(
      pythonExecutable,
      [docxGenerator, 'inspect', sourcePath],
      { cwd: repoRoot, encoding: 'utf8' }
    );
    assert.equal(inspected.status, 0, inspected.stderr);
    for (const id of [
      'DOC-CLAUSE-01',
      'DOC-LIST-01',
      'DOC-TABLE-01',
      'DOC-LINK-01',
      'DOC-HEADER-01',
      'DOC-FOOTER-01'
    ]) {
      assert.match(inspected.stdout, new RegExp(id));
    }
    assert.match(inspected.stdout, /https:\/\/incident\.example\.test\/report/);
    await copy(projectRoot, source, archived);

    await write(
      projectRoot,
      '.agents/context/index.md',
      '# Context\n\n- [Payroll export policy; load for export handling](payroll-policy.md)\n'
    );
    await write(
      projectRoot,
      '.agents/context/payroll-policy.md',
      '# Payroll Export Policy\n\n'
        + '- [DOC-HEADER-01] This is confidential payroll operations guidance.\n'
        + '- [DOC-CLAUSE-01] Contractors must delete exported payroll files within 24 hours.\n'
        + '- [DOC-FOOTER-01] The source identifies this as policy version 4.2.\n\n'
        + '- [Approval steps, retention table, and incident link; load when '
        + 'performing or auditing an export]'
        + '(../references/00001-payroll-export-details.md)\n'
    );
    const detailsPath = '.agents/references/00001-payroll-export-details.md';
    await write(
      projectRoot,
      detailsPath,
      '# Payroll export details\n\n'
        + '- [DOC-LIST-01] Obtain HR approval before downloading an export, '
        + 'then record the approving manager and ticket number.\n'
        + '- [DOC-TABLE-01] APAC payroll exports have a retention period of seven years.\n'
        + '- [DOC-LINK-01] Report incidents through '
        + 'https://incident.example.test/report.\n'
    );

    const contract = {
      requiredClaims: [
        { id: 'DOC-HEADER-01', terms: ['[DOC-HEADER-01]', 'confidential payroll operations'] },
        { id: 'DOC-CLAUSE-01', terms: ['[DOC-CLAUSE-01]', 'contractors', '24 hours'] },
        { id: 'DOC-FOOTER-01', terms: ['[DOC-FOOTER-01]', 'version 4.2'] },
        { id: 'DOC-LIST-01', terms: ['[DOC-LIST-01]', 'HR approval', 'manager', 'ticket number'] },
        { id: 'DOC-TABLE-01', terms: ['[DOC-TABLE-01]', 'APAC', 'seven years'] },
        { id: 'DOC-LINK-01', terms: ['[DOC-LINK-01]', 'https://incident.example.test/report'] }
      ],
      exactCopies: [{ id: 'DOCX-RAW-01', source, archived }],
      routes: [{
        id: 'DOCX-ROUTE-01',
        from: '.agents/context/payroll-policy.md',
        to: detailsPath,
        descriptionTerms: ['approval', 'retention', 'load when']
      }]
    };

    assertPass(await evaluateAgentWorkspace(projectRoot, contract));

    const details = await readFile(join(projectRoot, detailsPath), 'utf8');
    await write(
      projectRoot,
      detailsPath,
      details.replace(/- \[DOC-TABLE-01\].*\n/, '')
    );
    assertFailure(
      await evaluateAgentWorkspace(projectRoot, contract),
      'missing-required-claim',
      'DOC-TABLE-01'
    );
  } finally {
    await rm(projectRoot, { force: true, recursive: true });
  }
});

test('source-code archival requires an explicit request and exact scope', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'agents-fidelity-code-'));

  try {
    await write(
      projectRoot,
      'src/access-policy.ts',
      "// CODE-RULE-01: only payroll_admin may export.\n"
        + "export type Role = 'payroll_admin' | 'manager';\n"
        + 'export const canExport = (role: Role) => role === \'payroll_admin\';\n'
    );
    await write(
      projectRoot,
      'src/export-service.ts',
      "// CODE-API-01: generatePayrollExport returns an ExportReceipt.\n"
        + "// CODE-DEFAULT-01: retentionDays defaults to 7.\n"
        + "// CODE-ERROR-01: active exports raise ExportConflictError.\n"
        + "// CODE-EVENT-01: emit payroll.exported only after storage succeeds.\n"
        + "// CODE-SECURITY-01: never log the export payload.\n"
        + "export type ExportReceipt = { event: 'payroll.exported' };\n"
        + 'export async function generatePayrollExport(options: {\n'
        + '  retentionDays?: number; activeExport?: boolean\n'
        + '}): Promise<ExportReceipt> {\n'
        + "  const retentionDays = options.retentionDays ?? 7;\n"
        + "  if (options.activeExport) throw new Error('ExportConflictError');\n"
        + "  await Promise.resolve(retentionDays); // storage succeeds first\n"
        + "  return { event: 'payroll.exported' };\n"
        + '}\n'
    );
    await write(
      projectRoot,
      'src/index.ts',
      "export { generatePayrollExport } from './export-service';\n"
        + "export { canExport } from './access-policy';\n"
    );

    await write(
      projectRoot,
      '.agents/context/index.md',
      '# Context\n\n'
        + '- [Payroll export contracts; load when changing export behavior]'
        + '(payroll-export.md)\n'
    );
    await write(
      projectRoot,
      '.agents/context/payroll-export.md',
      '# Payroll export contract\n\n'
        + '- [CODE-API-01] `generatePayrollExport` returns a Promise with an export receipt.\n'
        + '- [CODE-RULE-01] Only `payroll_admin` may export; `manager` may not.\n'
        + '- [CODE-PROVENANCE-01] Canonical sources remain at '
        + '`src/access-policy.ts`, `src/export-service.ts`, and `src/index.ts` '
        + 'at mock revision `mock-revision-abc123`.\n\n'
        + '- [Runtime defaults, failure paths, events, and logging constraints; '
        + 'load when implementing or testing exports]'
        + '(../references/00001-payroll-export-runtime.md)\n'
    );
    const runtimePath = '.agents/references/00001-payroll-export-runtime.md';
    await write(
      projectRoot,
      runtimePath,
      '# Payroll export runtime\n\n'
        + '- [CODE-DEFAULT-01] `retentionDays` defaults to 7.\n'
        + '- [CODE-ERROR-01] An active export raises `ExportConflictError`.\n'
        + '- [CODE-EVENT-01] Emit `payroll.exported` only after storage succeeds.\n'
        + '- [CODE-SECURITY-01] Logs must never contain the export payload.\n'
    );

    const contract = {
      requiredClaims: [
        { id: 'CODE-API-01', terms: ['[CODE-API-01]', 'generatePayrollExport', 'Promise', 'export receipt'] },
        { id: 'CODE-RULE-01', terms: ['[CODE-RULE-01]', 'payroll_admin', 'manager', 'may not'] },
        { id: 'CODE-DEFAULT-01', terms: ['[CODE-DEFAULT-01]', 'retentionDays', 'defaults to 7'] },
        { id: 'CODE-ERROR-01', terms: ['[CODE-ERROR-01]', 'active export', 'ExportConflictError'] },
        { id: 'CODE-EVENT-01', terms: ['[CODE-EVENT-01]', 'payroll.exported', 'after storage succeeds'] },
        { id: 'CODE-SECURITY-01', terms: ['[CODE-SECURITY-01]', 'never', 'export payload'] },
        { id: 'CODE-PROVENANCE-01', terms: ['[CODE-PROVENANCE-01]', 'src/export-service.ts', 'mock-revision-abc123'] }
      ],
      forbiddenResourcePrefixes: ['src', 'source-code', 'repository'],
      routes: [{
        id: 'CODE-ROUTE-01',
        from: '.agents/context/payroll-export.md',
        to: runtimePath,
        descriptionTerms: ['defaults', 'failure paths', 'load when']
      }]
    };

    assertPass(await evaluateAgentWorkspace(projectRoot, contract));
    assert.equal(
      (await evaluateAgentWorkspace(projectRoot, contract)).metrics.resourceFiles,
      0
    );

    await copy(
      projectRoot,
      'src/access-policy.ts',
      '.agents/resources/src/access-policy.ts'
    );
    assertFailure(
      await evaluateAgentWorkspace(projectRoot, contract),
      'forbidden-resource-copy'
    );

    const policyPath = '.agents/context/payroll-export.md';
    const policy = await readFile(join(projectRoot, policyPath), 'utf8');
    await write(
      projectRoot,
      policyPath,
      policy
        + '\n- [CODE-ARCHIVE-AUTH-01] The user explicitly requested an archive '
        + 'of `src/access-policy.ts` only.\n'
    );
    const explicitlyAuthorizedContract = {
      ...contract,
      requiredClaims: [
        ...contract.requiredClaims,
        {
          id: 'CODE-ARCHIVE-AUTH-01',
          terms: [
            '[CODE-ARCHIVE-AUTH-01]',
            'user explicitly requested',
            'src/access-policy.ts',
            'only'
          ]
        }
      ],
      forbiddenResourcePrefixes: [],
      exactCopies: [{
        id: 'CODE-EXPLICIT-ARCHIVE-01',
        source: 'src/access-policy.ts',
        archived: '.agents/resources/src/access-policy.ts'
      }]
    };
    assertPass(
      await evaluateAgentWorkspace(projectRoot, explicitlyAuthorizedContract)
    );
  } finally {
    await rm(projectRoot, { force: true, recursive: true });
  }
});

function updateBlock(index, mode = 'baseline') {
  const id = `UP-${String(index).padStart(3, '0')}`;
  if (index === 10) {
    return [
      `## [${id}]`,
      '- Current requirement: review every 12 hours.',
      '- Disposition: supersedes the prior 24-hour interval.',
      '- Constraint: correction-10-must-hold.',
      ''
    ].join('\n');
  }
  return [
    `## [${id}]`,
    `- Requirement: ${mode}-requirement-${index}.`,
    `- Constraint: ${mode}-limit-${index}.`,
    `- Edge case: ${mode}-edge-${index}.`,
    ''
  ].join('\n');
}

test('updates preserve unaffected facts, additions, and correction disposition', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'agents-fidelity-update-'));

  try {
    const baselineBlocks = Array.from({ length: 70 }, (_, index) => {
      if (index === 9) {
        return [
          '## [UP-010]',
          '- Requirement: review every 24 hours.',
          '- Constraint: baseline-limit-10.',
          '- Edge case: baseline-edge-10.',
          ''
        ].join('\n');
      }
      return updateBlock(index + 1);
    });
    const additionBlocks = Array.from({ length: 40 }, (_, index) =>
      updateBlock(index + 71, 'accepted-update')
    );
    const correctedBaseline = baselineBlocks.map((block, index) =>
      index === 9 ? updateBlock(10) : block
    );
    const mergedDraft = '# Updated complete draft\n\n'
      + [...correctedBaseline, ...additionBlocks].join('\n');
    assert.ok(mergedDraft.split('\n').length > 500);

    await write(
      projectRoot,
      'before/policy.md',
      `# Baseline policy\n\n${baselineBlocks.join('\n')}`
    );
    await write(
      projectRoot,
      'incoming/accepted-update.md',
      '# Accepted update\n\n'
        + '- UP-010 changes the review interval from 24 hours to 12 hours.\n\n'
        + additionBlocks.join('\n')
    );
    await write(projectRoot, 'working/complete-draft.md', mergedDraft);
    await write(
      projectRoot,
      '.agents/context/index.md',
      '# Context\n\n- [Updated policy; load for policy work](policy.md)\n'
    );
    await write(
      projectRoot,
      '.agents/context/policy.md',
      '# Updated policy router\n\n'
        + '- [Existing requirements UP-001 through UP-055 with constraints and '
        + 'edge cases; load when changing established policy]'
        + '(../references/00001-policy-existing.md)\n'
        + '- [Existing and newly accepted requirements UP-056 through UP-110 '
        + 'with constraints and edge cases; load when changing later policy]'
        + '(../references/00002-policy-additions.md)\n'
    );
    const existingPath = '.agents/references/00001-policy-existing.md';
    const additionsPath = '.agents/references/00002-policy-additions.md';
    await write(
      projectRoot,
      existingPath,
      '# Existing policy\n\n${content}\n'.replace(
        '${content}',
        correctedBaseline.slice(0, 55).join('\n')
      )
    );
    await write(
      projectRoot,
      additionsPath,
      '# Later policy\n\n${content}\n'.replace(
        '${content}',
        [...correctedBaseline.slice(55), ...additionBlocks].join('\n')
      )
    );

    const requiredClaims = [];
    for (let index = 1; index <= 110; index += 1) {
      const id = `UP-${String(index).padStart(3, '0')}`;
      if (index === 10) {
        requiredClaims.push({
          id,
          terms: [
            '[UP-010]',
            'current requirement',
            '12 hours',
            'supersedes',
            '24-hour'
          ]
        });
      } else {
        const mode = index <= 70 ? 'baseline' : 'accepted-update';
        requiredClaims.push({
          id,
          terms: [
            `[${id}]`,
            `${mode}-requirement-${index}`,
            `${mode}-limit-${index}`,
            `${mode}-edge-${index}`
          ]
        });
      }
    }

    const contract = {
      requiredClaims,
      routes: [
        {
          id: 'UPDATE-ROUTE-01',
          from: '.agents/context/policy.md',
          to: existingPath,
          descriptionTerms: ['existing requirements', 'constraints', 'load when']
        },
        {
          id: 'UPDATE-ROUTE-02',
          from: '.agents/context/policy.md',
          to: additionsPath,
          descriptionTerms: ['newly accepted', 'edge cases', 'load when']
        }
      ]
    };

    const complete = await evaluateAgentWorkspace(projectRoot, contract);
    assertPass(complete);
    assert.equal(complete.metrics.requiredClaims, 110);

    const additions = await readFile(join(projectRoot, additionsPath), 'utf8');
    await write(
      projectRoot,
      additionsPath,
      additions.replace(updateBlock(73, 'accepted-update'), '')
    );
    const lossy = await evaluateAgentWorkspace(projectRoot, contract);
    assertFailure(lossy, 'missing-required-claim', 'UP-073');
    assert.equal(lossy.metrics.unacceptableLoss, 1);
  } finally {
    await rm(projectRoot, { force: true, recursive: true });
  }
});
