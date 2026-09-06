import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const skillRoot = join(repoRoot, 'skills', 'chrisai-knowledge');
const installerPath = join(
  skillRoot,
  'scripts',
  'install_agent_workspace_rules.py'
);
const pythonExecutable = process.env.PYTHON
  || (process.platform === 'win32' ? 'python' : 'python3');

function runPython(script, args) {
  return spawnSync(pythonExecutable, [script, ...args], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
}

async function installWorkspace(targetRoot) {
  const result = runPython(installerPath, [
    '--target',
    targetRoot,
    '--apply'
  ]);

  assert.equal(result.status, 0, result.stderr);
  return join(targetRoot, '.agents');
}

function markdownLines(count) {
  return `${Array.from(
    { length: count },
    (_, index) => `line ${index + 1}`
  ).join('\n')}\n`;
}

test('agent workspace install manages required workflows idempotently', async () => {
  const targetRoot = await mkdtemp(join(tmpdir(), 'chrisai-knowledge-install-'));

  try {
    const agentsDir = await installWorkspace(targetRoot);
    const updateWorkflowPath = join(
      agentsDir,
      'workflows',
      'agent-file-update.md'
    );
    const installedValidatorPath = join(
      agentsDir,
      'scripts',
      'validate-agent-workspace.py'
    );
    const acceptanceWorkflowPath = join(
      agentsDir,
      'workflows',
      'spec-task-acceptance.md'
    );
    const updateWorkflow = await readFile(updateWorkflowPath, 'utf8');
    const acceptanceWorkflow = await readFile(acceptanceWorkflowPath, 'utf8');
    assert.ok(updateWorkflow.length > 0);
    assert.ok(acceptanceWorkflow.length > 0);

    const dryRun = runPython(installerPath, ['--target', targetRoot]);
    assert.equal(dryRun.status, 0, dryRun.stderr);
    assert.match(dryRun.stdout, /No changes needed\./);

    await rm(updateWorkflowPath);
    const missingWorkflow = runPython(installedValidatorPath, []);
    assert.equal(missingWorkflow.status, 1, missingWorkflow.stderr);
    assert.match(
      missingWorkflow.stdout,
      /workflows[\\/]agent-file-update\.md/
    );

    const repair = runPython(installerPath, [
      '--target',
      targetRoot,
      '--apply'
    ]);
    assert.equal(repair.status, 0, repair.stderr);

    const repairedWorkspace = runPython(installedValidatorPath, []);
    assert.equal(repairedWorkspace.status, 0, repairedWorkspace.stderr);

    await rm(acceptanceWorkflowPath);
    const missingAcceptance = runPython(installedValidatorPath, []);
    assert.equal(missingAcceptance.status, 1, missingAcceptance.stderr);
    assert.match(
      missingAcceptance.stdout,
      /workflows[\\/]spec-task-acceptance\.md/
    );

    const acceptanceRepair = runPython(installerPath, [
      '--target',
      targetRoot,
      '--apply'
    ]);
    assert.equal(acceptanceRepair.status, 0, acceptanceRepair.stderr);

    const acceptedWorkspace = runPython(installedValidatorPath, []);
    assert.equal(acceptedWorkspace.status, 0, acceptedWorkspace.stderr);
  } finally {
    await rm(targetRoot, { force: true, recursive: true });
  }
});

test('line validation enforces final boundaries and excludes non-Agent Files', async () => {
  const targetRoot = await mkdtemp(join(tmpdir(), 'chrisai-knowledge-lines-'));

  try {
    const agentsDir = await installWorkspace(targetRoot);
    const agentFile = join(agentsDir, 'size-test.md');
    const resourceFile = join(agentsDir, 'resources', 'raw-source.md');
    const installedSkillFile = join(
      agentsDir,
      'skills',
      'external-skill',
      'SKILL.md'
    );
    const installedValidatorPath = join(
      agentsDir,
      'scripts',
      'validate-agent-workspace.py'
    );

    await mkdir(dirname(resourceFile), { recursive: true });
    await mkdir(dirname(installedSkillFile), { recursive: true });
    await writeFile(resourceFile, markdownLines(700));
    await writeFile(
      installedSkillFile,
      `${markdownLines(700)}[Missing local file](missing.md)\n`
    );
    await writeFile(agentFile, markdownLines(200));

    const preferredBoundary = runPython(installedValidatorPath, []);
    assert.equal(preferredBoundary.status, 0, preferredBoundary.stderr);
    assert.doesNotMatch(preferredBoundary.stdout, /size-test\.md/);
    assert.doesNotMatch(preferredBoundary.stdout, /raw-source\.md/);
    assert.doesNotMatch(preferredBoundary.stdout, /external-skill/);
    assert.doesNotMatch(preferredBoundary.stdout, /missing\.md/);

    await writeFile(agentFile, markdownLines(201));
    const preferredWarning = runPython(installedValidatorPath, []);
    assert.equal(preferredWarning.status, 0, preferredWarning.stderr);
    assert.match(preferredWarning.stdout, /size-test\.md has 201 lines/);
    assert.doesNotMatch(preferredWarning.stdout, /raw-source\.md/);
    assert.doesNotMatch(preferredWarning.stdout, /external-skill/);

    await writeFile(agentFile, markdownLines(500));
    const hardBoundary = runPython(installedValidatorPath, []);
    assert.equal(hardBoundary.status, 0, hardBoundary.stderr);
    assert.doesNotMatch(hardBoundary.stdout, /final hard limit/);

    await writeFile(agentFile, markdownLines(501));
    const hardError = runPython(installedValidatorPath, []);
    assert.equal(hardError.status, 1, hardError.stderr);
    assert.match(hardError.stdout, /size-test\.md has 501 lines/);
    assert.doesNotMatch(hardError.stdout, /raw-source\.md/);
    assert.doesNotMatch(hardError.stdout, /external-skill/);
  } finally {
    await rm(targetRoot, { force: true, recursive: true });
  }
});

test('the full skill distribution can coexist under .agents/skills', async () => {
  const targetRoot = await mkdtemp(join(tmpdir(), 'chrisai-knowledge-skills-'));

  try {
    const agentsDir = await installWorkspace(targetRoot);
    const installedValidatorPath = join(
      agentsDir,
      'scripts',
      'validate-agent-workspace.py'
    );

    await cp(join(repoRoot, 'skills'), join(agentsDir, 'skills'), {
      recursive: true
    });

    const result = runPython(installedValidatorPath, []);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.doesNotMatch(result.stdout, /skills[\\/]/);
  } finally {
    await rm(targetRoot, { force: true, recursive: true });
  }
});
