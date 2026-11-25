// The Tired Dark Lord: A 100-Word Villain Monologue.
// Writes one monologue to /output/entry.txt and validates the gate:
// UTF-8 text, 1-600 characters, not only whitespace, about 100 words.
// Deterministic: no randomness, no Date, no network, no reads outside the repo.
const fs = require("node:fs");
const path = require("node:path");

const MONOLOGUE =
  "Come in. Mind the third step \u2014 it bites. I am Ashkar, who broke the Nine " +
  "Banners at Duskfield and drank the river dry to spite a king. His skull sits " +
  "on my desk so the tax collectors remember whose seal they stamp. And you have " +
  "come to slay me. Always a Tuesday. Shiny sword. Sit. I shall fetch the cursed " +
  "blade myself; my steward is away on his third... holiday. Look, hero. The " +
  "realm runs on ledgers now. Kill me, and someone still has to sign them. So. " +
  "The speech, or shall I simply surrender my Tuesdays and be done?";

function main() {
  const outDir = "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, MONOLOGUE, "utf8");

  const roundTrip = fs.readFileSync(outPath, "utf8");
  if (roundTrip !== MONOLOGUE) {
    throw new Error("UTF-8 round-trip failed");
  }
  if (MONOLOGUE.trim().length === 0) {
    throw new Error("entry is blank");
  }
  if (MONOLOGUE.length < 1 || MONOLOGUE.length > 600) {
    throw new Error("entry must be 1-600 characters, got " + MONOLOGUE.length);
  }
  const words = MONOLOGUE.trim().split(/\s+/).filter(Boolean);
  if (words.length < 90 || words.length > 110) {
    throw new Error("word count near 100 expected, got " + words.length);
  }
  // Criterion 2: the tiredness must be felt, never announced. Refuse any
  // plain statement of weariness sneaking into the monologue.
  const banned = ["tired", "weary", "exhausted", "fatigued", "weariness", "exhaustion"];
  const lower = MONOLOGUE.toLowerCase();
  for (const word of banned) {
    if (lower.includes(word)) {
      throw new Error("monologue must never plainly state weariness: found '" + word + "'");
    }
  }
  console.log("wrote " + outPath + " (" + MONOLOGUE.length + " chars, " + words.length + " words)");
}

main();
