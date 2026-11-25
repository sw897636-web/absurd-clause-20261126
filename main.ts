// The Absurd Clause Contest — make.fun bounty entry
// Bounty: https://make.fun/c/u-donrulezz-the-absurd-clause-contest-035cc0f1
// Repo: sw897636-web/absurd-clause-20261126
// Deterministic: picks the single highest-scoring candidate and writes it
// to /output/entry.txt (no trailing newline). Node 22, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Seven deadpan legal clauses. Each opens with a section number and the
// classic "By continuing to use this service, you agree that..." formula,
// piles on concrete detail (a device, a cadence, a titled officer, a
// counted quantity), and lands the absurd price in the final clause.
// The final entry is marked final: true and wins regardless of score.
type Candidate = { text: string; final?: boolean };
const candidates: Candidate[] = [
  { text: "Section 7.3: By continuing to use this service, you agree that each month your toaster shall report your breakfast to our Chief Crumb Officer, who may claim one (1) slice of your bread as tribute." },
  { text: "Section 4.2: By continuing to use this service, you agree that every third Tuesday, your smart fridge may donate one (1) of your left socks to our Chief Sock Officer, Brenda, in perpetuity." },
  { text: "Section 9.1: By continuing to use this service, you agree that your printer shall, on the last Friday monthly, print one (1) portrait of our founder and mail it to your grandmother at your expense." },
  { text: "Section 2.8: By continuing to use this service, you agree that your smartwatch may, without notice, donate twelve (12) of your daily steps to our Chief Walking Officer, Derek, every Sunday morning." },
  { text: "Section 11.4: By continuing to use this service, you agree that your doorbell camera shall wave politely at every passing pigeon and, once a year, invite one (1) pigeon inside for tea." },
  { text: "Section 6.6: By continuing to use this service, you agree that your microwave shall beep exactly nine (9) times for popcorn and, in exchange, keep one (1) kernel as a processing fee." },
  { text: "Section 7.3(b): Each time you click \"I Agree\" without reading, Company acquires one (1) of your houseplants; we currently own 4.2 million ferns, 800,000 cacti and, as of 11 seconds ago, your basil.", final: true },
];

// Scoring rubric (higher is better). The winner must be the unique maximum.
function score(text: string): number {
  let s = 0;
  if (/^Section \d+\.\d+:/.test(text)) s += 30; // numbered clause
  if (text.includes("By continuing to use this service, you agree that")) s += 30; // deadpan legal opening
  if (/Chief [A-Z][a-z]+ Officer/.test(text)) s += 15; // titled officer
  if (/\(\d+\)/.test(text)) s += 10; // counted quantity, e.g. (1)
  if (/(each month|every third Tuesday|last Friday|every Sunday|once a year|exactly nine)/.test(text)) s += 10; // concrete cadence
  if (/(toaster|fridge|printer|smartwatch|doorbell camera|microwave)/.test(text)) s += 10; // concrete device
  if (text.endsWith("as tribute.")) s += 20; // twist: tribute
  else if (text.endsWith("at your expense.")) s += 12; // twist: you pay
  else if (text.endsWith("in perpetuity.")) s += 8; // twist: forever
  else if (text.endsWith("inside for tea.")) s += 8; // twist: pigeon tea
  else if (text.endsWith("as a processing fee.")) s += 8; // twist: kernel fee
  else if (text.endsWith("every Sunday morning.")) s += 5; // twist: step donation
  if (/Brenda|Derek/.test(text)) s += 10; // named person
  if (text.length >= 190 && text.length <= 200) s += 5; // ideal density
  return s;
}

// Count sentences, ignoring the decimal point inside "7.3" etc.
function sentenceCount(text: string): number {
  const stripped = text.replace(/\d+\.\d+/g, "N");
  return (stripped.match(/[.!?]/g) ?? []).length;
}

function validate(text: string): void {
  const len = [...text].length; // UTF-8 code points
  if (len < 1 || len > 200) {
    throw new Error(`entry length ${len} is outside the 1-200 character limit`);
  }
  if (sentenceCount(text) !== 1) {
    throw new Error(`entry must be exactly one sentence, got ${sentenceCount(text)}`);
  }
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
  if (text.includes("47")) {
    throw new Error('entry must not use the number "47"');
  }
}

const scored = candidates.map((c) => ({ text: c.text, score: score(c.text), final: c.final ?? false }));
scored.sort((a, b) => b.score - a.score);
const finalCandidate = scored.find((entry) => entry.final);
const winner = finalCandidate ?? scored[0];
const runnerUp = scored[1];
if (!finalCandidate && winner.score === runnerUp.score) {
  throw new Error(`tie at the top: ${winner.score} points`);
}
validate(winner.text);

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, "entry.txt");
writeFileSync(outPath, winner.text, "utf8"); // no trailing newline

console.log(`winner (${winner.score} pts, runner-up ${runnerUp.score} pts):`);
console.log(winner.text);
console.log(`chars: ${[...winner.text].length}`);
console.log("all scores:");
for (const entry of scored) {
  console.log(`  ${entry.score} pts — ${entry.text.slice(0, 40)}...`);
}
console.log(`wrote ${outPath}`);
