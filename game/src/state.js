// Lantern Harbour — game state: the state machine, the timer, the score
// and the click verdicts. It knows nothing about drawing or the DOM.

import { SCENES } from './scenes.js';
import {
  HINT_FLASH_MS,
  LEVEL_CLEAR_TIME_BONUS_PER_SECOND,
  MISS_FLASH_MS,
  MISS_TIME_PENALTY,
  POINTS_PER_FIND,
  POINTS_PER_HINT,
  POINTS_PER_MISS,
  SCENE_TIMES,
} from './config.js';

export function createState() {
  return {
    mode: 'title',
    sceneIndex: 0,
    found: new Set(),
    score: 0,
    totalFound: 0,
    clicks: 0,
    hits: 0,
    misses: 0,
    hintsUsed: 0,
    timeLeft: SCENE_TIMES[0],
    hintDiff: null,
    hintUntil: 0,
    missMark: null,
    missUntil: 0,
    justFound: null,
    justFoundUntil: 0,
    levelBonus: 0,
    finalScore: 0,
  };
}

export function currentScene(state) {
  return SCENES[state.sceneIndex];
}

export function remainingCount(state) {
  return currentScene(state).diffs.length - state.found.size;
}

export function startScene(state, index) {
  state.sceneIndex = index;
  state.found = new Set();
  state.timeLeft = SCENE_TIMES[index];
  state.hintDiff = null;
  state.missMark = null;
  state.justFound = null;
  state.levelBonus = 0;
  state.mode = 'play';
}

export function startGame(state) {
  state.score = 0;
  state.totalFound = 0;
  state.clicks = 0;
  state.hits = 0;
  state.misses = 0;
  state.hintsUsed = 0;
  startScene(state, 0);
}

export function accuracy(state) {
  if (state.clicks === 0) return 100;
  return Math.round((state.hits / state.clicks) * 100);
}

// A click inside one panel, in panel-local coordinates. Returns what
// happened so the caller can play the right sound and animation.
export function tryClick(state, x, y, side, now) {
  if (state.mode !== 'play') return 'idle';
  state.clicks += 1;
  const scene = currentScene(state);
  for (const diff of scene.diffs) {
    const dx = x - diff.x;
    const dy = y - diff.y;
    if (Math.hypot(dx, dy) <= diff.r + 6) {
      if (state.found.has(diff.id)) return 'already';
      state.found.add(diff.id);
      state.hits += 1;
      state.totalFound += 1;
      state.score += POINTS_PER_FIND;
      state.justFound = diff;
      state.justFoundUntil = now + 900;
      if (state.found.size === scene.diffs.length) {
        state.levelBonus = Math.round(state.timeLeft) * LEVEL_CLEAR_TIME_BONUS_PER_SECOND;
        state.score += state.levelBonus;
        state.mode = state.sceneIndex === SCENES.length - 1 ? 'win' : 'levelClear';
        if (state.mode === 'win') state.finalScore = state.score;
      }
      return 'hit';
    }
  }
  state.misses += 1;
  state.score = Math.max(0, state.score + POINTS_PER_MISS);
  state.timeLeft = Math.max(0, state.timeLeft - MISS_TIME_PENALTY);
  state.missMark = { x, y, side };
  state.missUntil = now + MISS_FLASH_MS;
  return 'miss';
}

export function useHint(state, now) {
  if (state.mode !== 'play') return null;
  const unfound = currentScene(state).diffs.filter((d) => !state.found.has(d.id));
  if (unfound.length === 0) return null;
  const pick = unfound[Math.floor(Math.random() * unfound.length)];
  state.hintDiff = pick;
  state.hintUntil = now + HINT_FLASH_MS;
  state.hintsUsed += 1;
  state.score = Math.max(0, state.score + POINTS_PER_HINT);
  return pick;
}

export function tick(state, dtSeconds, now) {
  if (state.mode !== 'play') return;
  state.timeLeft -= dtSeconds;
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    state.mode = 'timeout';
  }
  if (state.hintDiff && now > state.hintUntil) state.hintDiff = null;
  if (state.missMark && now > state.missUntil) state.missMark = null;
  if (state.justFound && now > state.justFoundUntil) state.justFound = null;
}

export function nextScene(state) {
  if (state.sceneIndex + 1 < SCENES.length) startScene(state, state.sceneIndex + 1);
}

export function backToTitle(state) {
  state.mode = 'title';
}
