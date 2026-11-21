// Lantern Harbour — input: mouse clicks and keyboard shortcuts, mapped
// onto the 1280x720 canvas no matter how the browser scales it.

import { BUTTONS, LEFT_PANEL_X, PANEL_HEIGHT, PANEL_WIDTH, PANEL_Y, RIGHT_PANEL_X } from './config.js';

function toCanvas(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

function inside(point, box) {
  return point.x >= box.x && point.x <= box.x + box.w && point.y >= box.y && point.y <= box.y + box.h;
}

function panelAt(point) {
  if (point.y >= PANEL_Y && point.y <= PANEL_Y + PANEL_HEIGHT) {
    if (point.x >= LEFT_PANEL_X && point.x <= LEFT_PANEL_X + PANEL_WIDTH) {
      return { side: 0, x: point.x - LEFT_PANEL_X, y: point.y - PANEL_Y };
    }
    if (point.x >= RIGHT_PANEL_X && point.x <= RIGHT_PANEL_X + PANEL_WIDTH) {
      return { side: 1, x: point.x - RIGHT_PANEL_X, y: point.y - PANEL_Y };
    }
  }
  return null;
}

export function attachInput(canvas, state, actions) {
  canvas.addEventListener('pointerdown', (event) => {
    const point = toCanvas(canvas, event);
    const now = performance.now();
    if (state.mode === 'title') {
      actions.startGame();
      return;
    }
    if (state.mode === 'levelClear') {
      actions.nextScene();
      return;
    }
    if (state.mode === 'win' || state.mode === 'timeout') {
      actions.restart();
      return;
    }
    if (inside(point, BUTTONS.hint)) {
      actions.hint(now);
      return;
    }
    if (inside(point, BUTTONS.restart)) {
      actions.restartScene();
      return;
    }
    if (inside(point, BUTTONS.sound)) {
      actions.toggleSound();
      return;
    }
    for (let i = 0; i < 3; i++) {
      const tab = { x: 40 + i * 190, y: 618, w: 178, h: 44 };
      if (inside(point, tab)) {
        actions.jumpScene(i);
        return;
      }
    }
    const hit = panelAt(point);
    if (hit) actions.clickPanel(hit.side, hit.x, hit.y, now);
  });

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const now = performance.now();
    if (key === 'enter' || key === ' ') {
      if (state.mode === 'title') actions.startGame();
      else if (state.mode === 'levelClear') actions.nextScene();
      else if (state.mode === 'win' || state.mode === 'timeout') actions.restart();
      event.preventDefault();
    } else if (key === 'h') {
      actions.hint(now);
    } else if (key === 'r') {
      actions.restart();
    } else if (key === 'n') {
      if (state.mode === 'levelClear') actions.nextScene();
      else actions.jumpScene(Math.min(2, state.sceneIndex + 1));
    } else if (key === 'm') {
      actions.toggleSound();
    } else if (key === 'escape') {
      actions.backToTitle();
    } else if (key === '1' || key === '2' || key === '3') {
      actions.jumpScene(Number(key) - 1);
    }
  });
}
