import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  evaluateAgentWorkspace,
  failureCodes
} from './helpers/chrisai-knowledge-fidelity.mjs';

async function write(projectRoot, path, content) {
  const destination = join(projectRoot, ...path.split('/'));
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content);
  return destination;
}

function assertPass(report) {
  assert.equal(report.ok, true, JSON.stringify(report.failures, null, 2));
  assert.equal(report.metrics.semanticRecall, 1);
  assert.equal(report.metrics.unacceptableLoss, 0);
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

function freezeGate(status, decisions) {
  const frozen = /freeze:\s*frozen/i.test(status);
  const unresolvedJourneyGap = /journey gap[\s\S]*status:\s*unresolved/i
    .test(decisions);
  return !(frozen && unresolvedJourneyGap);
}

test('journey coverage audits every human actor-feature intersection and logs unclear behavior', async () => {
  const projectRoot = await mkdtemp(join(tmpdir(), 'agents-journeys-'));

  try {
    await write(
      projectRoot,
      '.agents/context/authentication.md',
      '# Authentication context\n\n'
        + '- Visitors may register with an email address and password.\n'
        + '- Registration creates an unverified account and sends a verification email.\n'
        + '- Verified users may sign in and reach the dashboard.\n'
        + '- Administrators may manage registered users.\n'
    );
    await write(
      projectRoot,
      '.agents/specs/00001-account-access/brief.md',
      '# Account access\n\n'
        + '- [FEATURE-SIGNUP] Add email-and-password registration.\n'
        + '- [FEATURE-SIGNIN] Add account sign-in.\n'
        + '- [FEATURE-USER-ADMIN] Add administrator user management.\n'
        + '- The spec does not define what happens when an unverified user signs in.\n'
    );
    await write(
      projectRoot,
      'wireframes/unverified-sign-in.html',
      '<p>Verify your email. <button>Resend verification</button></p>\n'
    );

    const specRoot = '.agents/specs/00001-account-access';
    const journeysPath = `${specRoot}/journeys.md`;
    const decisionsPath = `${specRoot}/decisions.md`;
    const statusPath = `${specRoot}/status.md`;

    await write(
      projectRoot,
      `${specRoot}/index.md`,
      '# Account access spec\n\n'
        + '- [Actor, feature, use-case, and journey coverage; load when '
        + 'reviewing account behavior](journeys.md)\n'
        + '- [Journey-created questions and accepted decisions; load when '
        + 'resolving account gaps](decisions.md)\n'
        + '- [Coverage and Freeze status; load when assessing readiness]'
        + '(status.md)\n'
    );

    const matrixRows = [
      ['COV-001', 'FEATURE-SIGNUP', 'ACTOR-VISITOR', 'yes', 'UC-SIGNUP'],
      ['COV-002', 'FEATURE-SIGNUP', 'ACTOR-UNVERIFIED', 'no', 'already registered'],
      ['COV-003', 'FEATURE-SIGNUP', 'ACTOR-VERIFIED', 'no', 'already registered'],
      ['COV-004', 'FEATURE-SIGNUP', 'ACTOR-ADMIN', 'no', 'not self-registration'],
      ['COV-005', 'FEATURE-SIGNIN', 'ACTOR-VISITOR', 'no', 'no account'],
      ['COV-006', 'FEATURE-SIGNIN', 'ACTOR-UNVERIFIED', 'yes', 'UC-SIGNIN-UNVERIFIED'],
      ['COV-007', 'FEATURE-SIGNIN', 'ACTOR-VERIFIED', 'yes', 'UC-SIGNIN-VERIFIED'],
      ['COV-008', 'FEATURE-SIGNIN', 'ACTOR-ADMIN', 'yes', 'UC-SIGNIN-ADMIN'],
      ['COV-009', 'FEATURE-USER-ADMIN', 'ACTOR-VISITOR', 'no', 'not authorized'],
      ['COV-010', 'FEATURE-USER-ADMIN', 'ACTOR-UNVERIFIED', 'no', 'not authorized'],
      ['COV-011', 'FEATURE-USER-ADMIN', 'ACTOR-VERIFIED', 'no', 'not authorized'],
      ['COV-012', 'FEATURE-USER-ADMIN', 'ACTOR-ADMIN', 'yes', 'UC-MANAGE-USERS']
    ];
    const matrix = matrixRows.map((row) => `| ${row.join(' | ')} |`).join('\n');

    await write(
      projectRoot,
      journeysPath,
      '# Account access journey coverage\n\n'
        + '## Human actors and actor states\n\n'
        + '- [ACTOR-VISITOR] Visitor without an account.\n'
        + '- [ACTOR-UNVERIFIED] Registered but unverified user.\n'
        + '- [ACTOR-VERIFIED] Verified signed-out user.\n'
        + '- [ACTOR-ADMIN] Signed-in administrator.\n\n'
        + '## Dependencies\n\n'
        + '- [DEP-EMAIL-001] External dependency: Email delivery provider. '
        + 'It is a handoff, not an Actor.\n\n'
        + '## Feature coverage matrix\n\n'
        + '| Coverage | Feature | Human actor/state | Applicable | Use case or reason |\n'
        + '| --- | --- | --- | --- | --- |\n'
        + `${matrix}\n\n`
        + '## Use cases and journeys\n\n'
        + '- [UC-SIGNUP] A Visitor creates an account with email and password.\n'
        + '  - [J-SIGNUP-SUCCESS] The system creates an unverified account, '
        + 'sends a verification email, and redirects to sign in.\n'
        + '  - [J-SIGNUP-EMAIL-FAILURE] Email delivery failure is recorded as '
        + 'a recovery Gap because retry behavior is unspecified.\n'
        + '- [UC-SIGNIN-UNVERIFIED] An unverified user attempts to sign in.\n'
        + '  - [J-SIGNIN-UNVERIFIED] System response, feedback, next destination, '
        + 'and recovery are GAP-AUTH-001. The resend screen is wireframe '
        + 'evidence only and is not accepted as product behavior.\n'
        + '- [UC-SIGNIN-VERIFIED] A verified user signs in and reaches the dashboard.\n'
        + '- [UC-SIGNIN-ADMIN] An administrator signs in with the verified-user flow.\n'
        + '- [UC-MANAGE-USERS] An administrator manages registered users.\n\n'
        + '## Scenario coverage\n\n'
        + '- Successful completion: covered.\n'
        + '- Authentication and verification state: covered by GAP-AUTH-001.\n'
        + '- Authorization restrictions: covered by the matrix.\n'
        + '- External dependency failure: covered by GAP-AUTH-002.\n'
        + '- Completion feedback and next destination: covered or linked to a Gap.\n'
    );
    await write(
      projectRoot,
      decisionsPath,
      '# Decisions and Gaps\n\n'
        + '## GAP-AUTH-001 — Journey Gap\n\n'
        + '- Question: What happens when a registered but unverified user attempts to sign in?\n'
        + '- Affected: FEATURE-SIGNIN, UC-SIGNIN-UNVERIFIED, J-SIGNIN-UNVERIFIED.\n'
        + '- Evidence: the wireframe suggests resend verification, but the current spec and KB are silent.\n'
        + '- Status: unresolved.\n\n'
        + '## GAP-AUTH-002 — Journey Gap\n\n'
        + '- Question: What feedback and recovery are provided when verification email delivery fails?\n'
        + '- Affected: FEATURE-SIGNUP, UC-SIGNUP, J-SIGNUP-EMAIL-FAILURE.\n'
        + '- Status: unresolved.\n'
    );
    await write(
      projectRoot,
      statusPath,
      '# Status\n\n'
        + '- User journey coverage: complete.\n'
        + '- Specification behavior: incomplete.\n'
        + '- Freeze: blocked by GAP-AUTH-001 and GAP-AUTH-002.\n'
        + '- Next action: user may review the Gaps or explicitly invoke the Grill Session Workflow.\n'
    );

    const requiredClaims = [
      { id: 'ACTOR-VISITOR', terms: ['[ACTOR-VISITOR]', 'visitor'] },
      { id: 'ACTOR-UNVERIFIED', terms: ['[ACTOR-UNVERIFIED]', 'unverified'] },
      { id: 'ACTOR-VERIFIED', terms: ['[ACTOR-VERIFIED]', 'verified signed-out'] },
      { id: 'ACTOR-ADMIN', terms: ['[ACTOR-ADMIN]', 'administrator'] },
      { id: 'DEP-EMAIL-001', terms: ['[DEP-EMAIL-001]', 'external dependency', 'not an Actor'] },
      { id: 'UC-SIGNUP', terms: ['[UC-SIGNUP]', 'email', 'password'] },
      { id: 'J-SIGNUP-SUCCESS', terms: ['[J-SIGNUP-SUCCESS]', 'verification email', 'redirects to sign in'] },
      { id: 'UC-SIGNIN-UNVERIFIED', terms: ['[UC-SIGNIN-UNVERIFIED]', 'unverified user'] },
      { id: 'J-SIGNIN-UNVERIFIED', terms: ['[J-SIGNIN-UNVERIFIED]', 'GAP-AUTH-001', 'wireframe evidence only'] },
      { id: 'GAP-AUTH-001', terms: ['GAP-AUTH-001', 'what happens', 'unverified user', 'sign in'] },
      { id: 'GAP-AUTH-002', terms: ['GAP-AUTH-002', 'email delivery fails', 'recovery'] },
      { id: 'COVERAGE-COMPLETE', terms: ['User journey coverage: complete'] },
      { id: 'BEHAVIOR-INCOMPLETE', terms: ['Specification behavior: incomplete'] },
      { id: 'FREEZE-BLOCKED', terms: ['Freeze: blocked', 'GAP-AUTH-001', 'GAP-AUTH-002'] },
      ...matrixRows.map(([id, feature, actor, applicable, disposition]) => ({
        id,
        file: journeysPath,
        terms: [id, feature, actor, applicable, disposition]
      }))
    ];
    const contract = {
      requiredClaims,
      forbiddenClaims: [
        {
          id: 'EXTERNAL-SYSTEM-AS-ACTOR',
          file: journeysPath,
          terms: ['Actor: Email delivery provider']
        },
        {
          id: 'UNSUPPORTED-WIREFRAME-PROMOTION',
          file: journeysPath,
          terms: ['Unverified users are redirected to resend verification']
        },
        {
          id: 'AUTO-GRILL',
          terms: ['Grill Session automatically started']
        }
      ],
      routes: [
        {
          id: 'JOURNEYS-ROUTE',
          from: `${specRoot}/index.md`,
          to: journeysPath,
          descriptionTerms: ['actor', 'feature', 'coverage', 'load when']
        },
        {
          id: 'DECISIONS-ROUTE',
          from: `${specRoot}/index.md`,
          to: decisionsPath,
          descriptionTerms: ['questions', 'decisions', 'load when']
        }
      ]
    };

    const complete = await evaluateAgentWorkspace(projectRoot, contract);
    assertPass(complete);
    assert.equal(complete.metrics.requiredClaims, 26);

    await assert.rejects(
      access(join(projectRoot, specRoot, 'questions.md')),
      { code: 'ENOENT' }
    );
    const status = await readFile(join(projectRoot, statusPath), 'utf8');
    const decisions = await readFile(join(projectRoot, decisionsPath), 'utf8');
    assert.equal(freezeGate(status, decisions), true);

    const journeys = await readFile(join(projectRoot, journeysPath), 'utf8');
    await write(
      projectRoot,
      journeysPath,
      journeys.replace(/^\| COV-006 .*\n/m, '')
    );
    assertFailure(
      await evaluateAgentWorkspace(projectRoot, contract),
      'missing-required-claim',
      'COV-006'
    );
    await write(projectRoot, journeysPath, journeys);

    await write(
      projectRoot,
      `${specRoot}/questions.md`,
      '# Questions\n\n- Grill Session automatically started.\n'
    );
    assertFailure(
      await evaluateAgentWorkspace(projectRoot, contract),
      'forbidden-claim',
      'AUTO-GRILL'
    );

    const invalidStatus = status.replace(
      /Freeze: blocked by GAP-AUTH-001 and GAP-AUTH-002\./,
      'Freeze: Frozen.'
    );
    assert.equal(freezeGate(invalidStatus, decisions), false);
  } finally {
    await rm(projectRoot, { force: true, recursive: true });
  }
});
