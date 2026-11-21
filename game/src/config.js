// Lantern Harbour — shared constants: canvas geometry, scoring and timing.
// One job only: every number the rest of the game agrees on lives here.

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

export const PANEL_WIDTH = 560;
export const PANEL_HEIGHT = 450;
export const PANEL_Y = 118;
export const LEFT_PANEL_X = 40;
export const RIGHT_PANEL_X = 680;

export const POINTS_PER_FIND = 100;
export const POINTS_PER_HINT = -25;
export const POINTS_PER_MISS = -10;
export const MISS_TIME_PENALTY = 3;
export const LEVEL_CLEAR_TIME_BONUS_PER_SECOND = 5;
export const HINT_FLASH_MS = 1800;
export const MISS_FLASH_MS = 450;
export const FIND_RING_RADIUS = 30;

export const SCENE_TIMES = [180, 150, 120];

export const BUTTONS = {
  hint: { x: 1050, y: 648, w: 100, h: 40, label: 'Hint (H)' },
  restart: { x: 930, y: 648, w: 110, h: 40, label: 'Restart (R)' },
  sound: { x: 810, y: 648, w: 110, h: 40, label: 'Sound (M)' },
};
