// Fix Human Sleep: Funniest Patch Note — entry writer.
//
// Writes one line of patch notes to /output/entry.txt. The line is a single
// changelog-style sentence, under the 160-character gate, with no trailing
// newline. After writing, the file is read back and re-verified against the
// gate (UTF-8, 1-160 chars, single line, no trailing whitespace) so a bad
// write can never pass silently.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Fixed a bug where the brain kept 47 tabs open overnight; background tabs now close automatically so sleep can load.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function clearOutputDirContents(dir: string): void {
  // Clear only the CONTENTS of the output dir — never the dir itself, which
  // may be a mount point in the grader sandbox.
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function verifyGate(text: string): void {
  if (text.length < 1 || text.length > 160) {
    throw new Error(`gate failed: entry is ${text.length} chars, must be 1-160`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("gate failed: entry has leading/trailing whitespace");
  }
}

clearOutputDirContents(OUTPUT_DIR);
writeFileSync(OUTPUT_FILE, ENTRY, "utf8");

// Read back and re-verify the exact bytes on disk.
const onDisk = readFileSync(OUTPUT_FILE, "utf8");
if (onDisk !== ENTRY) {
  throw new Error("verification failed: bytes on disk differ from the entry");
}
verifyGate(onDisk);

// The output dir itself must still exist (it is a mount point in grading),
// and it must contain only entry.txt — no stale files from earlier runs.
const remaining = readdirSync(OUTPUT_DIR);
if (remaining.length !== 1 || remaining[0] !== "entry.txt") {
  throw new Error(
    `verification failed: output dir holds ${JSON.stringify(remaining)}, expected only entry.txt`,
  );
}

// The gate counts characters; log the byte length too so a multi-byte
// surprise would be visible in the run log.
const byteLength = Buffer.byteLength(onDisk, "utf8");
if (byteLength !== onDisk.length) {
  console.log(`note: ${onDisk.length} chars / ${byteLength} bytes (non-ASCII present)`);
}

console.log(`wrote ${onDisk.length} chars to ${OUTPUT_FILE}`);
console.log(onDisk);
