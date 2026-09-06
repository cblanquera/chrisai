# ChrisAI Knowledge Fidelity Tests

This test plan measures whether Agent Document creation, Source Material
ingestion, and Agent Document updates lose required information. Line-count
compliance is checked, but it is never a substitute for fidelity.

The executable coverage is in `chrisai-knowledge-fidelity.test.mjs`. Its reusable
evaluator is `helpers/chrisai-knowledge-fidelity.mjs`. Test inputs and candidate
Agent Workspaces are created in isolated temporary directories.

## Measurement Contract

Each scenario defines its acceptance contract before the candidate Agent
Workspace is evaluated:

- `requiredClaims`: meaning-bearing facts that must remain together in at least
  one non-resource Agent File. Every required claim must be retained.
- `forbiddenClaims`: unsupported or contradictory claims that must not appear.
- `exactCopies`: source and archived Resource paths that must be byte-identical.
- `forbiddenResourcePrefixes`: canonical project paths that must not be copied
  into `.agents/resources/` for that scenario.
- `routes`: required owner-to-reference links plus terms that make each link
  useful for deciding when to load the reference.
- `maximumAgentFileLines`: the final per-file hard limit; it defaults to 500.

The evaluator reports:

- semantic recall: retained required claims divided by all required claims;
- unacceptable loss: required claims not found in the routed Agent Document;
- Raw Source parity failures;
- forbidden source copies or unsupported claims;
- missing or uninformative routes; and
- final Agent Files over the hard limit.

Passing requires semantic recall of `1`, unacceptable loss of `0`, and no
other failures. Material designated as an acceptable omission is excluded from
`requiredClaims`; it does not lower the passing threshold.

Stable fixture identifiers make deterministic checks possible. They represent
requirements, decisions, states, or other meaning-bearing source identifiers;
an agent running the scenario sees them in the source but does not see the
evaluation contract.

## Executable Scenarios

### Complete creation before splitting

The test creates a Complete Draft over 500 lines with 72 independently
identified findings. The expected Agent Document uses a concise owner and
three section-based Reference Files.

It verifies that:

- all 72 decisions, constraints, and edge cases survive;
- every final Agent File remains at or below 500 lines;
- links describe both reference contents and when to load them; and
- deleting one finding produces exactly one unit of unacceptable loss.

### Wireframe-package ingestion

The mock revision follows the same evidence shape as a real ChrisAI wireframe
revision: `specs.md`, `notes.md`, HTML, JavaScript, and CSS. The scenario marks
the revision as deletion-bound, so the complete package requires an exact Raw
Source archive.

Required Agent Document information includes screen purpose, workflow,
interaction, states, deferred production behavior, approval status, and review
history. Repeated HTML boilerplate and individual CSS declarations need not be
duplicated into Agent Files, but the archive remains byte-exact.

The negative checks mutate one archived source file and remove one accepted
review decision. The evaluator must distinguish the Raw Source parity failure
from semantic loss in the Agent Document.

### DOCX ingestion

`fixtures/chrisai-knowledge-fidelity/generate_mock_docx.py` creates a deterministic
DOCX with:

- title and ordinary paragraphs;
- a nested numbered-list relationship;
- a two-column table;
- a hyperlink;
- a header; and
- a footer containing the policy version.

The original DOCX is an external attachment, so the Resource copy must remain
byte-identical. The Agent Document must preserve the policy clause, list
hierarchy meaning, table relationship, hyperlink target, header meaning, and
footer version. OOXML relationship IDs, style identifiers, ZIP layout, and
pagination are acceptable Agent Document omissions because the original binary
is preserved.

### Canonical source-code ingestion

The mock TypeScript project contains a public function, authorization rule,
default, conflict error, event ordering, security constraint, and source
provenance. The Agent Document must preserve those behavioral contracts.

Function bodies, imports, syntax, formatting, and private implementation detail
are acceptable omissions. The canonical `src/` tree must remain in place;
copying it under `.agents/resources/` without an explicit user request is a test
failure. The negative check copies one canonical source file into resources and
verifies that the evaluator rejects it. A second contract then records an
explicit request for that exact source file, requires byte parity, and verifies
that only this explicit-request case passes.

### Existing Agent Document update

The baseline contains 70 requirements. The accepted update corrects one
requirement and adds 40 more, producing a Complete Draft over 500 lines. The
final Agent Document is repartitioned only after the merge.

It verifies that:

- every unaffected baseline requirement remains;
- all accepted additions remain;
- the changed requirement records its current value and the disposition of the
  old value;
- the final partitions and routes comply with the file rules; and
- deleting one unaffected prior requirement is reported as unacceptable loss.

### User journey coverage

The mock authentication spec defines registration, sign-in, and administrator
user management for four materially distinct human actors or actor states. The
coverage contract requires a disposition for all 12 actor-feature
intersections, applicable Use Cases, success and failure journeys, and linked
Gaps for unverified sign-in and verification-email failure.

The scenario verifies that an email provider remains an external dependency,
wireframe-only behavior is not silently promoted into the spec, and complete
coverage can coexist with incomplete specification behavior. Negative checks
remove one coverage-matrix row, start an unauthorized Grill Session, and try to
Freeze while journey Gaps remain unresolved.

## Live-Agent Evaluation Layer

The deterministic suite validates the fidelity oracle against complete and
deliberately damaged Agent Workspaces. It does not claim that an agent model
will follow the skill correctly.

A portable live-agent runner should later execute the same cases as follows:

1. Create an isolated project and install `chrisai-knowledge` into it.
2. Give a producer agent only the realistic request and source fixture. Do not
   expose the acceptance contract or intentionally damaged output.
3. Evaluate the produced `.agents/` workspace with the deterministic contract.
4. Give a fresh consumer agent only the produced Agent Workspace and a set of
   retrieval questions.
5. Score whether the consumer can recover the required facts without reopening
   Raw Source and whether it loads only task-relevant Reference Files.

Live execution should be opt-in until this repository has an agent-runner
adapter with stable output capture. The deterministic tests remain part of the
normal `npm test` command.

## Additional Cases To Add From Observed Failures

- conflicting ingestion must stop without mutating accepted Agent Documents;
- updating a shared Reference File must preserve content owned by other Agent
  Documents;
- a coherent 201-500 line file may remain intact when another split would harm
  retrieval;
- replacing a deletion-bound source archive must retain prior version evidence
  when history is required; and
- extracted documents with tracked changes, comments, footnotes, embedded
  objects, or meaning-bearing images need format-specific retention contracts.
