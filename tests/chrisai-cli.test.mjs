//node
import {
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

//client
const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const cliPath = join(repoRoot, 'bin', 'chrisai.js');
const packagePath = join(repoRoot, 'package.json');
const versionPath = join(repoRoot, 'VERSION');

/**
 * Run the local CLI with a deterministic environment.
 */
function runCli(args, env = {}) {
  return spawnSync(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    env: { ...process.env, ...env },
    encoding: 'utf8'
  });
}

test('package exposes the chrisai binary', async () => {
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));

  assert.equal(packageJson.bin.chrisai, './bin/chrisai.js');
});

test('version prints the repository version', async () => {
  const version = (await readFile(versionPath, 'utf8')).trim();
  const result = runCli(['version']);

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, new RegExp(`ChrisAI version: ${version}`));
});

test('install syncs the requested target', async () => {
  const targetDir = await mkdtemp(join(tmpdir(), 'chrisai-codex-test-'));

  try {
    const result = runCli(['install', '--target', 'codex'], {
      CHRISAI_CODEX_SKILLS_DIR: targetDir
    });

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Synced ChrisAI skills/);

    const installedSkill = await readFile(
      join(targetDir, 'chrisai-router', 'SKILL.md'),
      'utf8'
    );

    assert.match(installedSkill, /name: chrisai-router/);
  } finally {
    await rm(targetDir, { force: true, recursive: true });
  }
});

test('validate works without shell tools on PATH', () => {
  const result = runCli(['validate'], { PATH: '' });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Validated 19 skills and 1 template/);
});

test('install works without shell tools on PATH', async () => {
  const targetDir = await mkdtemp(join(tmpdir(), 'chrisai-portable-test-'));

  try {
    const result = runCli(['install', '--target', 'codex'], {
      CHRISAI_CODEX_SKILLS_DIR: targetDir,
      PATH: ''
    });

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /Synced ChrisAI skills/);
    assert.match(
      await readFile(join(targetDir, 'chrisai-router', 'SKILL.md'), 'utf8'),
      /name: chrisai-router/
    );
  } finally {
    await rm(targetDir, { force: true, recursive: true });
  }
});

test('install preserves extra installed skills and local overlays', async () => {
  const targetDir = await mkdtemp(join(tmpdir(), 'chrisai-retired-test-'));

  try {
    await mkdir(join(targetDir, 'github-pages-vanilla'), { recursive: true });
    await mkdir(join(targetDir, 'local-environment'), { recursive: true });
    await mkdir(join(targetDir, 'custom-team-skill'), { recursive: true });
    await writeFile(
      join(targetDir, 'github-pages-vanilla', 'SKILL.md'),
      'retired'
    );
    await writeFile(
      join(targetDir, 'local-environment', 'SKILL.md'),
      'machine-local'
    );

    const result = runCli(['install', '--target', 'codex'], {
      CHRISAI_CODEX_SKILLS_DIR: targetDir
    });

    assert.equal(result.status, 0, result.stderr);

    assert.equal(
      await readFile(join(targetDir, 'github-pages-vanilla', 'SKILL.md'), 'utf8'),
      'retired'
    );
    assert.equal(
      await readFile(join(targetDir, 'local-environment', 'SKILL.md'), 'utf8'),
      'machine-local'
    );
    await mkdir(join(targetDir, 'custom-team-skill'), { recursive: false })
      .then(() => assert.fail('custom-team-skill should already exist'))
      .catch(error => assert.equal(error.code, 'EEXIST'));
  } finally {
    await rm(targetDir, { force: true, recursive: true });
  }
});

test('install rejects unknown targets', () => {
  const result = runCli(['install', '--target', 'unknown']);

  assert.equal(result.status, 2);
  assert.match(result.stderr, /Unknown target/);
});
