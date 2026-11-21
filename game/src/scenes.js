// Lantern Harbour — scene registry: what each scene is and where its
// seven differences hide. Art lives in draw-harbour.js, draw-market.js and
// draw-bay.js; this file only names the scenes and their differences.

import { drawHarbour } from './draw-harbour.js';
import { drawMarket } from './draw-market.js';
import { drawBay } from './draw-bay.js';

export const SCENES = [
  {
    id: 'harbour',
    name: 'Harbour at Dusk',
    subtitle: 'Fishing boats come home as the lighthouse wakes',
    draw: drawHarbour,
    diffs: [
      { id: 'beam', label: 'Lighthouse beam', x: 470, y: 88, r: 30 },
      { id: 'flag', label: 'Boat flag colour', x: 355, y: 133, r: 24 },
      { id: 'gull', label: 'An extra gull', x: 120, y: 82, r: 24 },
      { id: 'window', label: 'Cottage window lit', x: 92, y: 302, r: 24 },
      { id: 'fish', label: 'A jumping fish', x: 430, y: 382, r: 26 },
      { id: 'buoy', label: 'Buoy colour', x: 200, y: 392, r: 24 },
      { id: 'crate', label: 'A crate on the pier', x: 520, y: 332, r: 26 },
    ],
  },
  {
    id: 'market',
    name: 'Lantern Night Market',
    subtitle: 'Paper lanterns over the tea stalls',
    draw: drawMarket,
    diffs: [
      { id: 'lantern', label: 'Lantern colour', x: 140, y: 112, r: 24 },
      { id: 'cat', label: 'A cat on the roof', x: 450, y: 92, r: 26 },
      { id: 'sign', label: 'Stall sign word', x: 300, y: 212, r: 26 },
      { id: 'apples', label: 'Apples in the basket', x: 92, y: 352, r: 26 },
      { id: 'bulb', label: 'A dark string bulb', x: 280, y: 94, r: 22 },
      { id: 'hat', label: 'Vendor hat', x: 382, y: 252, r: 26 },
      { id: 'kite', label: 'A paper kite', x: 500, y: 62, r: 24 },
    ],
  },
  {
    id: 'bay',
    name: 'Moonlit Ferry Bay',
    subtitle: 'The last ferry under a full moon',
    draw: drawBay,
    diffs: [
      { id: 'moon', label: 'Crater on the moon', x: 100, y: 82, r: 28 },
      { id: 'funnel', label: 'Ferry funnel stripes', x: 300, y: 182, r: 26 },
      { id: 'lamp', label: 'Pier lamp lit', x: 480, y: 302, r: 24 },
      { id: 'net', label: 'A fishing net', x: 150, y: 382, r: 28 },
      { id: 'star', label: 'An extra star', x: 420, y: 62, r: 22 },
      { id: 'coil', label: 'A rope coil', x: 250, y: 402, r: 24 },
      { id: 'cabin', label: 'Ferry cabin window', x: 360, y: 232, r: 24 },
    ],
  },
];

export function sceneCount() {
  return SCENES.length;
}

export function differencesPerScene() {
  return 7;
}
