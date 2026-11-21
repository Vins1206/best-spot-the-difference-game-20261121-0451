// Lantern Harbour — bootstrap: wires the canvas, the state, the input and
// the sounds together and runs the frame loop. Nothing game-specific lives
// here beyond the wiring.

import { CANVAS_HEIGHT, CANVAS_WIDTH } from './config.js';
import { attachInput } from './input.js';
import { render } from './render.js';
import { applyShotPreset } from './shots.js';
import {
  backToTitle,
  createState,
  currentScene,
  nextScene,
  remainingCount,
  startGame,
  startScene,
  tick,
  tryClick,
  useHint,
} from './state.js';
import {
  isMuted,
  playClick,
  playFind,
  playHint,
  playLevelClear,
  playMiss,
  playTimeout,
  playWin,
  toggleMuted,
} from './audio.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const statusLine = document.getElementById('status');
const state = createState();
applyShotPreset(state);

let lastStatus = '';
function announce() {
  let text;
  if (state.mode === 'title') {
    text = 'Lantern Harbour, spot the difference. Three scenes, seven differences each. Press Enter to start.';
  } else if (state.mode === 'win') {
    text = 'You found all 21 differences. Final score ' + state.finalScore + '. Press R to play again.';
  } else if (state.mode === 'timeout') {
    text = "Time's up in " + currentScene(state).name + '. Press R to retry the scene.';
  } else {
    text =
      currentScene(state).name +
      ': ' +
      state.found.size +
      ' of 7 found, ' +
      remainingCount(state) +
      ' left, score ' +
      state.score +
      ', ' +
      Math.ceil(state.timeLeft) +
      ' seconds left.';
  }
  if (text !== lastStatus) {
    lastStatus = text;
    statusLine.textContent = text;
  }
}

function resultSound(result, previousMode) {
  if (result === 'hit') {
    playFind();
    if (state.mode === 'levelClear') playLevelClear();
    if (state.mode === 'win') playWin();
  } else if (result === 'miss') {
    playMiss();
  } else if (result === 'already') {
    playClick();
  }
  if (previousMode === 'play' && state.mode === 'timeout') playTimeout();
}

const actions = {
  startGame() {
    playClick();
    startGame(state);
    announce();
  },
  clickPanel(side, x, y, now) {
    const previousMode = state.mode;
    const result = tryClick(state, x, y, side, now);
    resultSound(result, previousMode);
    announce();
  },
  hint(now) {
    const picked = useHint(state, now);
    if (picked) {
      playHint();
      announce();
    }
  },
  restart() {
    playClick();
    startGame(state);
    announce();
  },
  restartScene() {
    playClick();
    startScene(state, state.sceneIndex);
    announce();
  },
  nextScene() {
    playClick();
    nextScene(state);
    announce();
  },
  jumpScene(index) {
    playClick();
    state.totalFound = index * 7;
    startScene(state, index);
    announce();
  },
  toggleSound() {
    toggleMuted();
    statusLine.textContent = isMuted() ? 'Sound off.' : 'Sound on.';
    lastStatus = statusLine.textContent;
  },
  backToTitle() {
    backToTitle(state);
    announce();
  },
};

attachInput(canvas, state, actions);

let lastFrame = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  tick(state, dt, now);
  render(ctx, state, now);
  announce();
  requestAnimationFrame(frame);
}

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
announce();
requestAnimationFrame(frame);
