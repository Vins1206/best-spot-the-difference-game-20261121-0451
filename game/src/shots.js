// Lantern Harbour — screenshot presets: ?shot= start | play | play2 | win | level
// puts the game into a fixed, deterministic state so the screenshots the
// maker takes are real renders of the game's own code, in mid-game, on the
// title screen, and on the win screen. Normal play ignores these entirely.

import { currentScene } from './state.js';

export function applyShotPreset(state) {
  const params = new URLSearchParams(window.location.search);
  const shot = params.get('shot');
  if (!shot) return;
  const sceneParam = Number(params.get('scene') || '0');
  const sceneIndex = Number.isInteger(sceneParam) && sceneParam >= 0 && sceneParam <= 2 ? sceneParam : 0;

  if (shot === 'start') {
    state.mode = 'title';
    state.sceneIndex = 0;
    return;
  }
  if (shot === 'play') {
    state.mode = 'play';
    state.sceneIndex = sceneIndex;
    state.timeLeft = 132;
    state.score = 340;
    state.clicks = 4;
    state.hits = 3;
    state.misses = 1;
    state.hintsUsed = 1;
    state.totalFound = 3;
    state.found = new Set(currentScene(state).diffs.slice(0, 3).map((d) => d.id));
    return;
  }
  if (shot === 'play2') {
    state.mode = 'play';
    state.sceneIndex = 1;
    state.timeLeft = 118;
    state.score = 210;
    state.clicks = 3;
    state.hits = 2;
    state.misses = 1;
    state.hintsUsed = 0;
    state.totalFound = 2;
    state.found = new Set([currentScene(state).diffs[0].id, currentScene(state).diffs[3].id]);
    return;
  }
  if (shot === 'win') {
    state.mode = 'win';
    state.sceneIndex = 2;
    state.timeLeft = 64;
    state.score = 2480;
    state.finalScore = 2480;
    state.clicks = 24;
    state.hits = 21;
    state.misses = 3;
    state.hintsUsed = 2;
    state.totalFound = 21;
    state.found = new Set(currentScene(state).diffs.map((d) => d.id));
    return;
  }
  if (shot === 'level') {
    state.mode = 'levelClear';
    state.sceneIndex = 0;
    state.timeLeft = 84;
    state.score = 1120;
    state.levelBonus = 420;
    state.clicks = 8;
    state.hits = 7;
    state.misses = 1;
    state.totalFound = 7;
    state.found = new Set(currentScene(state).diffs.map((d) => d.id));
  }
}
