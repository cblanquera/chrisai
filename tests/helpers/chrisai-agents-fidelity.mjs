import { readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';

function portablePath(path) {
  return path.split(sep).join('/');
}

function nativePath(root, path) {
  return join(root, ...path.split('/'));
}

function normalizedText(value) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en-US')
    .replace(/\s+/g, ' ')
    .trim();
}

async function listFiles(root) {
  let entries;

  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(path));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }
  return files;
}

function markdownLinks(markdown, fromPath) {
  const links = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;

  while ((match = pattern.exec(markdown)) !== null) {
    const href = match[2].trim();
    if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('#')) {
      continue;
    }
    links.push({
      text: match[1],
      target: resolve(dirname(fromPath), href.split('#')[0])
    });
  }
  return links;
}

function lineCount(text) {
  if (text.length === 0) {
    return 0;
  }
  const count = text.split(/\r?\n/).length;
  return /\r?\n$/.test(text) ? count - 1 : count;
}

export async function evaluateAgentWorkspace(projectRoot, contract) {
  const agentsRoot = join(projectRoot, '.agents');
  const resourceRoot = join(agentsRoot, 'resources');
  const allFiles = await listFiles(agentsRoot);
  const agentPaths = allFiles.filter((path) => {
    const relativePath = portablePath(relative(agentsRoot, path));
    return path.endsWith('.md') && !relativePath.startsWith('resources/');
  });
  const agentDocuments = new Map();

  for (const path of agentPaths) {
    const relativePath = portablePath(relative(projectRoot, path));
    agentDocuments.set(relativePath, await readFile(path, 'utf8'));
  }

  const failures = [];
  const requiredClaims = contract.requiredClaims ?? [];
  const retainedClaims = [];

  for (const claim of requiredClaims) {
    const candidates = claim.file
      ? [[claim.file, agentDocuments.get(claim.file)]]
      : [...agentDocuments.entries()];
    const terms = claim.terms.map(normalizedText);
    const match = candidates.find(([, content]) => {
      if (typeof content !== 'string') {
        return false;
      }
      const normalized = normalizedText(content);
      return terms.every((term) => normalized.includes(term));
    });

    if (match) {
      retainedClaims.push(claim.id);
    } else {
      failures.push({ code: 'missing-required-claim', id: claim.id });
    }
  }

  for (const claim of contract.forbiddenClaims ?? []) {
    const candidates = claim.file
      ? [[claim.file, agentDocuments.get(claim.file)]]
      : [...agentDocuments.entries()];
    const terms = claim.terms.map(normalizedText);
    const match = candidates.find(([, content]) => {
      if (typeof content !== 'string') {
        return false;
      }
      const normalized = normalizedText(content);
      return terms.every((term) => normalized.includes(term));
    });

    if (match) {
      failures.push({
        code: 'forbidden-claim',
        id: claim.id,
        file: match[0]
      });
    }
  }

  for (const copy of contract.exactCopies ?? []) {
    try {
      const source = await readFile(nativePath(projectRoot, copy.source));
      const archived = await readFile(nativePath(projectRoot, copy.archived));
      if (!source.equals(archived)) {
        failures.push({ code: 'raw-source-mismatch', id: copy.id });
      }
    } catch (error) {
      failures.push({
        code: 'raw-source-missing',
        id: copy.id,
        detail: error.code
      });
    }
  }

  const resourceFiles = await listFiles(resourceRoot);
  const relativeResourceFiles = resourceFiles.map((path) =>
    portablePath(relative(resourceRoot, path))
  );

  for (const prefix of contract.forbiddenResourcePrefixes ?? []) {
    const normalizedPrefix = prefix.replaceAll('\\', '/').replace(/^\.\//, '');
    const match = relativeResourceFiles.find((path) =>
      path === normalizedPrefix || path.startsWith(`${normalizedPrefix}/`)
    );
    if (match) {
      failures.push({
        code: 'forbidden-resource-copy',
        prefix: normalizedPrefix,
        file: match
      });
    }
  }

  for (const route of contract.routes ?? []) {
    const fromPath = nativePath(projectRoot, route.from);
    const markdown = agentDocuments.get(route.from);
    if (typeof markdown !== 'string') {
      failures.push({ code: 'route-owner-missing', id: route.id });
      continue;
    }

    const expectedTarget = nativePath(projectRoot, route.to);
    const link = markdownLinks(markdown, fromPath).find(
      (candidate) => candidate.target === expectedTarget
    );
    if (!link) {
      failures.push({ code: 'route-missing', id: route.id });
      continue;
    }

    const normalizedLink = normalizedText(link.text);
    const describesRoute = (route.descriptionTerms ?? [])
      .map(normalizedText)
      .every((term) => normalizedLink.includes(term));
    if (!describesRoute) {
      failures.push({ code: 'route-description-incomplete', id: route.id });
    }
  }

  const maximumLines = contract.maximumAgentFileLines ?? 500;
  for (const [path, markdown] of agentDocuments) {
    const lines = lineCount(markdown);
    if (lines > maximumLines) {
      failures.push({ code: 'agent-file-too-long', file: path, lines });
    }
  }

  const totalClaims = requiredClaims.length;
  const retainedCount = retainedClaims.length;
  return {
    ok: failures.length === 0,
    failures,
    metrics: {
      requiredClaims: totalClaims,
      retainedClaims: retainedCount,
      unacceptableLoss: totalClaims - retainedCount,
      semanticRecall: totalClaims === 0 ? 1 : retainedCount / totalClaims,
      exactCopies: (contract.exactCopies ?? []).length,
      agentFiles: agentDocuments.size,
      resourceFiles: relativeResourceFiles.length
    }
  };
}

export function failureCodes(report) {
  return report.failures.map((failure) => failure.code);
}
