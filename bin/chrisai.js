#!/usr/bin/env node

//node
const { spawnSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { join, resolve } = require('node:path');

// package files are resolved from this executable so npx temp installs work
const packageRoot = resolve(__dirname, '..');
const scriptsDir = join(packageRoot, 'scripts');

// install targets map to the existing shell scripts, keeping behavior in one
// place while the Node wrapper only handles npm/npx argument parsing
const installScripts = {
  claude: join(scriptsDir, 'sync-claude.sh'),
  codex: join(scriptsDir, 'sync-codex.sh'),
  opencode: join(scriptsDir, 'sync-opencode.sh')
};

/**
 * Print concise command usage.
 */
function printHelp() {
  console.log(`Usage:
  chrisai install --target <codex|claude|opencode>
  chrisai validate
  chrisai version
  chrisai help`);
}

/**
 * Print an error and exit with the requested code.
 */
function fail(message, code = 1) {
  console.error(message);
  process.exit(code);
}

/**
 * Run a repository maintenance script and forward its output.
 */
function runScript(scriptPath) {
  const result = spawnSync(scriptPath, {
    cwd: packageRoot,
    env: process.env,
    encoding: 'utf8',
    stdio: 'inherit'
  });

  if (result.error) {
    fail(result.error.message);
  }

  process.exit(result.status ?? 1);
}

/**
 * Read the repository VERSION file.
 */
function getVersion() {
  return readFileSync(join(packageRoot, 'VERSION'), 'utf8').trim();
}

/**
 * Resolve the install target from CLI arguments.
 */
function getInstallTarget(args) {
  const targetIndex = args.indexOf('--target');

  if (targetIndex === -1 || !args[targetIndex + 1]) {
    fail('Missing required --target <codex|claude|opencode>', 2);
  }

  return args[targetIndex + 1];
}

/**
 * Dispatch the CLI command.
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === 'version' || command === '--version' || command === '-v') {
    console.log(`ChrisAI version: ${getVersion()}`);
    return;
  }

  if (command === 'validate') {
    runScript(join(scriptsDir, 'validate-skills.py'));
    return;
  }

  if (command === 'install') {
    const target = getInstallTarget(args.slice(1));
    const scriptPath = installScripts[target];

    if (!scriptPath) {
      fail(`Unknown target: ${target}`, 2);
    }

    runScript(scriptPath);
    return;
  }

  fail(`Unknown command: ${command}`, 2);
}

main();
