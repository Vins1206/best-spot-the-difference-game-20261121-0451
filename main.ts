// Lantern Harbour — hand-in program (Node 22, standard library only).
//
// It gathers the entry from beside this file and lays it out for the grader:
//   game/        -> <output>/game
//   screenshots/ -> <output>/screenshots
//   dossier.json -> <output>/dossier.json (written by vendor/makefun-game.ts)
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// The run is deterministic: the same input files always produce the same
// output bytes, so the grader's two runs agree.

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repoRoot = fileURLToPath(new URL('./', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function countEntries(dir: string): number {
  let total = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    total += 1;
    if (statSync(path).isDirectory()) total += countEntries(path);
  }
  return total;
}

function fail(message: string): never {
  throw new Error(`Lantern Harbour hand-in: ${message}`);
}

const gameDir = join(repoRoot, 'game');
const shotsDir = join(repoRoot, 'screenshots');
if (!existsSync(gameDir)) fail('game/ is missing from the repository');
if (!existsSync(join(gameDir, 'index.html'))) fail('game/index.html is missing');
if (!existsSync(shotsDir)) fail('screenshots/ is missing from the repository');

const shotNames = readdirSync(shotsDir).filter((name) => !name.startsWith('.')).sort();
if (shotNames.length < 3 || shotNames.length > 4) {
  fail(`expected 3 or 4 screenshots, found ${shotNames.length}`);
}
for (const name of shotNames) {
  if (statSync(join(shotsDir, name)).size > 262144) fail(`screenshot ${name} is over 256 KiB`);
}
if (countEntries(gameDir) > 993) fail('game/ holds more than 993 files and directories');

mkdirSync(outputDir, { recursive: true });
cpSync(gameDir, join(outputDir, 'game'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
cpSync(shotsDir, join(outputDir, 'screenshots'), { recursive: true });

const dossierCaps = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
};
writeFileSync(join(outputDir, 'dossier.json'), buildDossier(outputDir, dossierCaps));

const dossierBytes = statSync(join(outputDir, 'dossier.json')).size;
console.log(
  `Lantern Harbour handed in: ${shotNames.length} screenshots, ` +
  `${countEntries(join(outputDir, 'game'))} game entries, dossier ${dossierBytes} bytes -> ${outputDir}`,
);
