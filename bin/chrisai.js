#!/usr/bin/env node

//node
const {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync
} = require('node:fs');
const { homedir } = require('node:os');
const { join, resolve } = require('node:path');

// package files are resolved from this executable so npx temp installs work
const packageRoot = resolve(__dirname, '..');
const skillsDir = join(packageRoot, 'skills');
const templatesDir = join(packageRoot, 'templates');

// target directories follow the shell scripts first, then use platform-aware
// defaults for users who install from Windows without a Unix shell
const targetResolvers = {
  claude: () => process.env.CHRISAI_CLAUDE_SKILLS_DIR
    || join(homedir(), '.claude', 'skills'),
  codex: () => process.env.CHRISAI_CODEX_SKILLS_DIR
    || join(process.env.CODEX_HOME || join(homedir(), '.codex'), 'skills'),
  opencode: () => process.env.CHRISAI_OPENCODE_SKILLS_DIR
    || (
      process.platform === 'win32' && process.env.APPDATA
        ? join(process.env.APPDATA, 'opencode', 'skills')
        : join(homedir(), '.config', 'opencode', 'skills')
    )
};

const namePattern = /^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$/;

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
 * Read the repository VERSION file.
 */
function getVersion() {
  return readFileSync(join(packageRoot, 'VERSION'), 'utf8').trim();
}

/**
 * Return package-relative text for validation messages.
 */
function relativePath(path) {
  return path.replace(`${packageRoot}/`, '').replace(`${packageRoot}\\`, '');
}

/**
 * Parse the small SKILL.md frontmatter shape ChrisAI supports.
 */
function parseFrontmatter(skillFile) {
  const text = readFileSync(skillFile, 'utf8');

  if (!text.startsWith('---\n')) {
    return { errors: ['missing opening YAML frontmatter delimiter'], metadata: {} };
  }

  const endIndex = text.indexOf('\n---\n', 4);
  if (endIndex === -1) {
    return { errors: ['missing closing YAML frontmatter delimiter'], metadata: {} };
  }

  const errors = [];
  const metadata = {};
  const lines = text.slice(4, endIndex).split(/\r?\n/);

  lines.forEach((line, index) => {
    if (!line.trim()) {
      return;
    }

    if (!line.includes(':')) {
      errors.push(`line ${index + 2}: expected key: value`);
      return;
    }

    const [rawKey, ...rawValue] = line.split(':');
    const key = rawKey.trim();
    const value = rawValue.join(':').trim().replace(/^['"]|['"]$/g, '');

    if (!key) {
      errors.push(`line ${index + 2}: empty frontmatter key`);
      return;
    }

    metadata[key] = value;
  });

  return { errors, metadata };
}

/**
 * Validate one skill-shaped directory.
 */
function validateSkill(skillDir) {
  const errors = [];
  const skillFile = join(skillDir, 'SKILL.md');
  const folderName = skillDir.split(/[\\/]/).pop();

  if (!existsSync(skillFile)) {
    return [`${relativePath(skillDir)}: missing SKILL.md`];
  }

  if (!namePattern.test(folderName)) {
    errors.push(`${relativePath(skillDir)}: folder name must be lowercase kebab-case`);
  }

  const frontmatter = parseFrontmatter(skillFile);
  frontmatter.errors.forEach(error => {
    errors.push(`${relativePath(skillFile)}: ${error}`);
  });

  const { metadata } = frontmatter;
  if (!metadata.name) {
    errors.push(`${relativePath(skillFile)}: missing name`);
  } else if (metadata.name !== folderName) {
    errors.push(
      `${relativePath(skillFile)}: name '${metadata.name}' must match folder '${folderName}'`
    );
  } else if (!namePattern.test(metadata.name)) {
    errors.push(`${relativePath(skillFile)}: invalid name '${metadata.name}'`);
  }

  if (!metadata.description) {
    errors.push(`${relativePath(skillFile)}: missing description`);
  }

  const extraKeys = Object.keys(metadata)
    .filter(key => key !== 'name' && key !== 'description')
    .sort();

  if (extraKeys.length > 0) {
    errors.push(
      `${relativePath(skillFile)}: unsupported frontmatter keys: ${extraKeys.join(', ')}`
    );
  }

  return errors;
}

/**
 * Return child directories for a path that exists.
 */
function listDirectories(path) {
  if (!existsSync(path)) {
    return [];
  }

  return readdirSync(path)
    .map(name => join(path, name))
    .filter(childPath => statSync(childPath).isDirectory())
    .sort();
}

/**
 * Validate skills, templates, and release metadata without external tools.
 */
function validate() {
  const skillDirs = listDirectories(skillsDir);
  const templateDirs = listDirectories(templatesDir)
    .filter(templateDir => existsSync(join(templateDir, 'SKILL.md')));
  const errors = [];

  if (!existsSync(skillsDir)) {
    errors.push('skills directory is missing');
  } else if (skillDirs.length === 0) {
    errors.push('no skills found');
  }

  skillDirs.forEach(skillDir => errors.push(...validateSkill(skillDir)));
  templateDirs.forEach(templateDir => errors.push(...validateSkill(templateDir)));

  const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  const version = getVersion();
  if (packageJson.version !== version) {
    errors.push(
      `package.json version '${packageJson.version}' must match VERSION '${version}'`
    );
  }

  if (errors.length > 0) {
    console.error('Skill validation failed:');
    errors.forEach(error => console.error(`- ${error}`));
    process.exit(1);
  }

  if (templateDirs.length > 0) {
    const templateLabel = templateDirs.length === 1 ? 'template' : 'templates';
    console.log(
      `Validated ${skillDirs.length} skills and ${templateDirs.length} ${templateLabel}.`
    );
    return;
  }

  console.log(`Validated ${skillDirs.length} skills.`);
}

/**
 * Copy one directory recursively while ignoring Python cache artifacts.
 */
function copyDirectory(sourceDir, targetDir) {
  cpSync(sourceDir, targetDir, {
    filter: sourcePath => {
      const name = sourcePath.split(/[\\/]/).pop();
      return name !== '__pycache__' && !name.endsWith('.pyc');
    },
    force: true,
    recursive: true
  });
}

/**
 * Remove ChrisAI-owned skill folders that are no longer in this distribution.
 */
function pruneRetiredChrisAiSkills(targetDir, activeSkillNames) {
  listDirectories(targetDir).forEach(targetSkillDir => {
    const skillName = targetSkillDir.split(/[\\/]/).pop();

    if (
      !activeSkillNames.has(skillName)
      && (skillName === 'chrisai' || skillName.startsWith('chrisai-'))
    ) {
      rmSync(targetSkillDir, { force: true, recursive: true });
    }
  });
}

/**
 * Sync current ChrisAI skills into a target directory.
 */
function install(target) {
  const resolveTarget = targetResolvers[target];

  if (!resolveTarget) {
    fail(`Unknown target: ${target}`, 2);
  }

  validate();

  const targetDir = resolveTarget();
  mkdirSync(targetDir, { recursive: true });

  const skillDirs = listDirectories(skillsDir);
  const activeSkillNames = new Set(
    skillDirs.map(skillDir => skillDir.split(/[\\/]/).pop())
  );

  pruneRetiredChrisAiSkills(targetDir, activeSkillNames);

  skillDirs.forEach(skillDir => {
    const skillName = skillDir.split(/[\\/]/).pop();
    const targetSkillDir = join(targetDir, skillName);

    rmSync(targetSkillDir, { force: true, recursive: true });
    copyDirectory(skillDir, targetSkillDir);
  });

  console.log(`Synced ChrisAI skills to ${targetDir}`);
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
    validate();
    return;
  }

  if (command === 'install') {
    const target = getInstallTarget(args.slice(1));
    install(target);
    return;
  }

  fail(`Unknown command: ${command}`, 2);
}

main();
