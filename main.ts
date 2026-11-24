// One-line excuse: writes exactly one line to /output/entry.txt and nothing else.
// Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I delivered on time in a parallel branch. Unfortunately, this is the main branch.";

// The excuse is one line by definition: refuse to run if it ever gains a newline.
if (/[\r\n]/.test(LINE)) {
  throw new Error("the excuse line must be a single line");
}

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, LINE, "utf8");

// Self-check: the output file must hold exactly the line, 1-160 chars, no extra bytes.
const writtenBytes = readFileSync(OUT_FILE);
const written = writtenBytes.toString("utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the excuse line exactly");
}
if (writtenBytes.length !== Buffer.byteLength(LINE, "utf8")) {
  throw new Error("entry.txt has extra bytes beyond the excuse line");
}
if (written.length < 1 || written.length > 160) {
  throw new Error(`entry.txt is ${written.length} characters, outside the 1-160 gate`);
}
console.log(`wrote ${written.length} characters to ${OUT_FILE}`);
