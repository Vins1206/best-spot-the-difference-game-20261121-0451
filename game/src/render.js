// Lantern Harbour — rendering: everything the player sees, drawn on one
// canvas. Panels, rings, HUD, timer and all overlays live here; the game
// logic lives in state.js and the art lives in the draw-*.js files.

import {
  BUTTONS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  LEFT_PANEL_X,
  PANEL_HEIGHT,
  PANEL_WIDTH,
  PANEL_Y,
  RIGHT_PANEL_X,
} from './config.js';
import { accuracy, currentScene, remainingCount } from './state.js';
import { SCENES } from './scenes.js';

function panelX(side) {
  return side === 0 ? LEFT_PANEL_X : RIGHT_PANEL_X;
}

function drawFoundRing(g, x, y, pulse) {
  const r = 26 + (pulse ? Math.sin(performance.now() / 180) * 2 : 0);
  g.strokeStyle = '#ffd98a';
  g.lineWidth = 5;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.stroke();
  g.strokeStyle = '#2e7d4f';
  g.lineWidth = 2.5;
  g.beginPath();
  g.arc(x, y, r - 6, 0, Math.PI * 2);
  g.stroke();
  g.strokeStyle = '#2e7d4f';
  g.lineWidth = 4;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x - 9, y);
  g.lineTo(x - 2, y + 8);
  g.lineTo(x + 10, y - 8);
  g.stroke();
}

function drawPanel(g, state, side, now) {
  const scene = currentScene(state);
  const x = panelX(side);
  g.save();
  g.beginPath();
  g.rect(x, PANEL_Y, PANEL_WIDTH, PANEL_HEIGHT);
  g.clip();
  g.translate(x, PANEL_Y);
  scene.draw(g, side);
  g.restore();

  // Gold frame and label.
  g.strokeStyle = '#e8b23a';
  g.lineWidth = 3;
  g.strokeRect(x, PANEL_Y, PANEL_WIDTH, PANEL_HEIGHT);
  g.fillStyle = '#f4ead8';
  g.font = 'bold 15px sans-serif';
  g.textAlign = 'left';
  g.textBaseline = 'alphabetic';
  g.fillText(side === 0 ? 'LEFT  ·  the original' : 'RIGHT  ·  spot 7 differences', x + 4, PANEL_Y - 8);

  // Rings on every difference already found, on both panels.
  for (const diff of scene.diffs) {
    if (!state.found.has(diff.id)) continue;
    const isNew = state.justFound && state.justFound.id === diff.id && now < state.justFoundUntil;
    drawFoundRing(g, x + diff.x, PANEL_Y + diff.y, isNew);
  }

  // Hint: a pulsing amber circle on both panels.
  if (state.hintDiff && now < state.hintUntil) {
    const d = state.hintDiff;
    const r = 24 + Math.sin(now / 130) * 5;
    g.strokeStyle = '#ffb347';
    g.lineWidth = 4;
    g.setLineDash([8, 6]);
    g.beginPath();
    g.arc(x + d.x, PANEL_Y + d.y, r, 0, Math.PI * 2);
    g.stroke();
    g.setLineDash([]);
  }

  // Wrong-click mark, on the panel that was clicked.
  if (state.missMark && state.missMark.side === side && now < state.missUntil) {
    const m = state.missMark;
    g.strokeStyle = '#ff5a4e';
    g.lineWidth = 4;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(x + m.x - 10, PANEL_Y + m.y - 10);
    g.lineTo(x + m.x + 10, PANEL_Y + m.y + 10);
    g.moveTo(x + m.x + 10, PANEL_Y + m.y - 10);
    g.lineTo(x + m.x - 10, PANEL_Y + m.y + 10);
    g.stroke();
  }
}

function drawButton(g, button, active) {
  g.fillStyle = active ? '#e8b23a' : '#2e3a52';
  g.strokeStyle = '#e8b23a';
  g.lineWidth = 1.5;
  g.beginPath();
  g.roundRect(button.x, button.y, button.w, button.h, 8);
  g.fill();
  g.stroke();
  g.fillStyle = active ? '#1a2233' : '#f4ead8';
  g.font = 'bold 14px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(button.label, button.x + button.w / 2, button.y + button.h / 2 + 1);
}

function drawHud(g, state) {
  const scene = currentScene(state);
  // Top bar.
  g.fillStyle = '#1a2233';
  g.fillRect(0, 0, CANVAS_WIDTH, 92);
  g.fillStyle = '#e8b23a';
  g.font = 'bold 30px sans-serif';
  g.textAlign = 'left';
  g.textBaseline = 'alphabetic';
  g.fillText('LANTERN HARBOUR', 40, 42);
  g.fillStyle = '#9fb4d8';
  g.font = '16px sans-serif';
  g.fillText('Spot the Difference  ·  ' + scene.name + '  ·  ' + scene.subtitle, 40, 68);

  // Remaining counter: the big number the judge looks for.
  const left = state.mode === 'title' ? 7 : remainingCount(state);
  g.fillStyle = left === 0 ? '#2e7d4f' : '#c65f6e';
  g.beginPath();
  g.roundRect(1010, 14, 230, 64, 12);
  g.fill();
  g.fillStyle = '#ffffff';
  g.font = 'bold 34px sans-serif';
  g.textAlign = 'center';
  g.fillText(left + ' LEFT', 1125, 58);

  // Timer bar.
  const total = [180, 150, 120][state.sceneIndex];
  const frac = Math.max(0, state.timeLeft / total);
  g.fillStyle = '#2e3a52';
  g.fillRect(40, 92, CANVAS_WIDTH - 80, 8);
  g.fillStyle = frac > 0.33 ? '#3f8f7a' : '#d94f3d';
  g.fillRect(40, 92, (CANVAS_WIDTH - 80) * frac, 8);
  g.fillStyle = '#f4ead8';
  g.font = 'bold 15px sans-serif';
  g.textAlign = 'left';
  const mm = Math.floor(state.timeLeft / 60);
  const ss = String(Math.floor(state.timeLeft % 60)).padStart(2, '0');
  g.fillText('TIME ' + mm + ':' + ss, 40, 88);

  // Bottom bar: scene tabs, score, buttons.
  g.fillStyle = '#1a2233';
  g.fillRect(0, 596, CANVAS_WIDTH, 124);
  SCENES.forEach((s, i) => {
    const bx = 40 + i * 190;
    const active = i === state.sceneIndex && state.mode !== 'title';
    const done = i < state.sceneIndex;
    g.fillStyle = active ? '#e8b23a' : done ? '#2e7d4f' : '#2e3a52';
    g.beginPath();
    g.roundRect(bx, 618, 178, 44, 8);
    g.fill();
    g.fillStyle = active ? '#1a2233' : '#f4ead8';
    g.font = 'bold 14px sans-serif';
    g.textAlign = 'center';
    g.fillText((done ? '✓ ' : '') + (i + 1) + '. ' + s.name, bx + 89, 645);
  });
  g.fillStyle = '#f4ead8';
  g.font = 'bold 20px sans-serif';
  g.textAlign = 'left';
  g.fillText('Score  ' + state.score, 40, 700);
  g.fillStyle = '#9fb4d8';
  g.font = '15px sans-serif';
  g.fillText('Found ' + state.totalFound + ' / 21   ·   Accuracy ' + accuracy(state) + '%   ·   Hints ' + state.hintsUsed, 230, 700);
  drawButton(g, BUTTONS.sound, false);
  drawButton(g, BUTTONS.restart, false);
  drawButton(g, BUTTONS.hint, false);
  g.fillStyle = '#9fb4d8';
  g.font = '13px sans-serif';
  g.textAlign = 'right';
  g.fillText('Click a difference  ·  H hint  ·  R restart  ·  N next scene', 1240, 700);
}

function drawCard(g, title, lines, accent) {
  g.fillStyle = 'rgba(10, 14, 26, 0.72)';
  g.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const cw = 620;
  const ch = 150 + lines.length * 34;
  const cx = (CANVAS_WIDTH - cw) / 2;
  const cy = (CANVAS_HEIGHT - ch) / 2;
  g.fillStyle = '#1a2233';
  g.strokeStyle = accent;
  g.lineWidth = 3;
  g.beginPath();
  g.roundRect(cx, cy, cw, ch, 16);
  g.fill();
  g.stroke();
  g.fillStyle = accent;
  g.font = 'bold 34px sans-serif';
  g.textAlign = 'center';
  g.fillText(title, CANVAS_WIDTH / 2, cy + 58);
  g.fillStyle = '#f4ead8';
  g.font = '18px sans-serif';
  lines.forEach((line, i) => {
    g.fillText(line, CANVAS_WIDTH / 2, cy + 108 + i * 34);
  });
}

function drawTitle(g, state) {
  drawPanel(g, state, 0, performance.now());
  drawPanel(g, state, 1, performance.now());
  g.fillStyle = 'rgba(10, 14, 26, 0.55)';
  g.fillRect(0, 100, CANVAS_WIDTH, 496);
  const lines = [
    'Two pictures, side by side — 7 differences hide in the right one.',
    'Click a difference to ring it. Wrong clicks cost 10 points and 3 seconds.',
    'Three harbours to clear: Dusk, Night Market, Moonlit Bay — 21 finds in all.',
    'H shows a hint  ·  R restarts  ·  N jumps to the next scene',
    '',
    '▶  Click anywhere or press Enter to start',
  ];
  drawCard(g, 'LANTERN HARBOUR', lines, '#e8b23a');
}

export function render(g, state, now) {
  g.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  g.fillStyle = '#101623';
  g.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (state.mode === 'title') {
    drawHud(g, state);
    drawTitle(g, state);
    return;
  }
  drawPanel(g, state, 0, now);
  drawPanel(g, state, 1, now);
  drawHud(g, state);
  if (state.mode === 'levelClear') {
    drawCard(
      g,
      'Scene complete!',
      [
        'All 7 differences found in ' + currentScene(state).name + '.',
        'Time bonus  +' + state.levelBonus + '   ·   Score  ' + state.score,
        '',
        '▶  Press N or click to play the next scene',
      ],
      '#3f8f7a',
    );
  } else if (state.mode === 'win') {
    drawCard(
      g,
      'You found them all!',
      [
        '21 differences across three harbours — the lanterns are lit.',
        'Final score  ' + state.finalScore + '   ·   Accuracy ' + accuracy(state) + '%',
        'Hints used  ' + state.hintsUsed + '   ·   Wrong clicks  ' + state.misses,
        '',
        '▶  Press R to play again',
      ],
      '#e8b23a',
    );
  } else if (state.mode === 'timeout') {
    drawCard(
      g,
      "Time's up!",
      [
        'You found ' + state.found.size + ' of 7 differences in ' + currentScene(state).name + '.',
        'Score  ' + state.score + '   ·   The unfound ones are still hiding.',
        '',
        '▶  Press R to try this scene again',
      ],
      '#d94f3d',
    );
  }
}
