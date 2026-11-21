// Lantern Harbour — Scene 1 art: Harbour at Dusk.
// Draws one 560x450 panel with plain canvas shapes. `side` 0 is the left
// picture, 1 is the right picture; the right side carries the differences:
// beam off, teal flag, an extra gull, a dark window, a jumping fish, a
// green buoy, and the pier crate gone.

export function drawHarbour(g, side) {
  const R = side === 1;
  const W = 560;
  const H = 450;

  // Dusk sky.
  const sky = g.createLinearGradient(0, 0, 0, 250);
  sky.addColorStop(0, '#2b2350');
  sky.addColorStop(0.55, '#c65f6e');
  sky.addColorStop(1, '#f2a35e');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, 250);

  // Stars, fading near the horizon.
  g.fillStyle = '#fff6d8';
  const stars = [[40, 40], [90, 28], [160, 55], [210, 30], [260, 62], [330, 38], [380, 24], [430, 48], [510, 32], [540, 70], [70, 110], [250, 100], [360, 90]];
  for (const [x, y] of stars) {
    g.beginPath();
    g.arc(x, y, 2, 0, Math.PI * 2);
    g.fill();
  }

  // Low sun.
  g.fillStyle = '#ffd98a';
  g.beginPath();
  g.arc(300, 215, 26, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(255, 217, 138, 0.25)';
  g.beginPath();
  g.arc(300, 215, 40, 0, Math.PI * 2);
  g.fill();

  // Gulls: two on the left picture, three on the right.
  g.strokeStyle = '#2b2350';
  g.lineWidth = 2.5;
  g.lineCap = 'round';
  const gulls = [[120, 82], [190, 60], [250, 95]];
  const shown = R ? gulls : gulls.slice(1);
  for (const [x, y] of shown) {
    g.beginPath();
    g.moveTo(x - 10, y);
    g.quadraticCurveTo(x - 4, y - 8, x, y);
    g.quadraticCurveTo(x + 4, y - 8, x + 10, y);
    g.stroke();
  }

  // Headland and lighthouse.
  g.fillStyle = '#3a2f4d';
  g.beginPath();
  g.moveTo(430, 250);
  g.lineTo(560, 250);
  g.lineTo(560, 340);
  g.lineTo(430, 340);
  g.closePath();
  g.fill();
  g.fillStyle = '#f4ead8';
  g.fillRect(458, 78, 28, 172);
  g.fillStyle = '#c65f6e';
  g.fillRect(458, 110, 28, 14);
  g.fillRect(458, 160, 28, 14);
  g.fillRect(458, 210, 28, 14);
  g.fillStyle = '#2b2350';
  g.fillRect(452, 62, 40, 16);
  // Lamp: warm on the left, cold and dark on the right.
  g.fillStyle = R ? '#8fa3b8' : '#ffe9a3';
  g.beginPath();
  g.arc(472, 70, 9, 0, Math.PI * 2);
  g.fill();
  if (!R) {
    g.fillStyle = 'rgba(255, 233, 163, 0.30)';
    g.beginPath();
    g.moveTo(464, 66);
    g.lineTo(330, 30);
    g.lineTo(330, 108);
    g.lineTo(464, 76);
    g.closePath();
    g.fill();
    g.fillStyle = 'rgba(255, 233, 163, 0.18)';
    g.beginPath();
    g.arc(472, 70, 22, 0, Math.PI * 2);
    g.fill();
  }

  // Shore with cottages.
  g.fillStyle = '#4a3a55';
  g.fillRect(0, 240, 430, 100);
  // Cottage with the window difference.
  g.fillStyle = '#7a5a68';
  g.fillRect(48, 268, 88, 66);
  g.fillStyle = '#3a2f4d';
  g.beginPath();
  g.moveTo(40, 270);
  g.lineTo(92, 238);
  g.lineTo(144, 270);
  g.closePath();
  g.fill();
  g.fillStyle = R ? '#2b2350' : '#ffd98a';
  g.fillRect(82, 292, 20, 20);
  g.strokeStyle = '#3a2f4d';
  g.lineWidth = 2;
  g.strokeRect(82, 292, 20, 20);
  if (!R) {
    g.fillStyle = 'rgba(255, 217, 138, 0.25)';
    g.fillRect(74, 284, 36, 36);
  }
  g.fillStyle = '#5a3a4a';
  g.fillRect(112, 296, 14, 38);
  // Second cottage, quieter.
  g.fillStyle = '#6a4a58';
  g.fillRect(160, 282, 70, 52);
  g.fillStyle = '#3a2f4d';
  g.beginPath();
  g.moveTo(154, 284);
  g.lineTo(195, 256);
  g.lineTo(236, 284);
  g.closePath();
  g.fill();
  g.fillStyle = '#ffd98a';
  g.fillRect(186, 296, 14, 14);

  // Pier on the right, with a crate on the left picture only.
  g.fillStyle = '#5d4632';
  g.fillRect(470, 322, 90, 14);
  g.fillStyle = '#4a3626';
  g.fillRect(482, 336, 8, 30);
  g.fillRect(540, 336, 8, 30);
  if (!R) {
    g.fillStyle = '#a8763e';
    g.fillRect(508, 306, 26, 26);
    g.strokeStyle = '#5d4632';
    g.lineWidth = 2;
    g.strokeRect(508, 306, 26, 26);
    g.beginPath();
    g.moveTo(508, 306);
    g.lineTo(534, 332);
    g.moveTo(534, 306);
    g.lineTo(508, 332);
    g.stroke();
  }

  // Sea.
  const sea = g.createLinearGradient(0, 340, 0, H);
  sea.addColorStop(0, '#3f6d8e');
  sea.addColorStop(1, '#1e3a52');
  g.fillStyle = sea;
  g.fillRect(0, 340, W, 110);
  g.strokeStyle = 'rgba(255, 246, 216, 0.5)';
  g.lineWidth = 2;
  for (const [x, y, len] of [[60, 372, 46], [150, 398, 60], [300, 372, 52], [380, 408, 66], [470, 372, 44], [90, 424, 58], [250, 424, 40]]) {
    g.beginPath();
    g.moveTo(x, y);
    g.quadraticCurveTo(x + len / 2, y - 6, x + len, y);
    g.stroke();
  }

  // Fishing boat with the flag difference.
  g.fillStyle = '#8a4a3a';
  g.beginPath();
  g.moveTo(280, 352);
  g.lineTo(400, 352);
  g.lineTo(384, 384);
  g.lineTo(296, 384);
  g.closePath();
  g.fill();
  g.fillStyle = '#5d4632';
  g.fillRect(336, 122, 6, 230);
  g.fillStyle = R ? '#3f8f7a' : '#d94f3d';
  g.beginPath();
  g.moveTo(342, 122);
  g.lineTo(374, 132);
  g.lineTo(342, 144);
  g.closePath();
  g.fill();
  g.fillStyle = '#f4ead8';
  g.beginPath();
  g.moveTo(342, 318);
  g.lineTo(366, 318);
  g.lineTo(354, 350);
  g.lineTo(342, 350);
  g.closePath();
  g.fill();

  // Buoy: red and white on the left, green on the right.
  g.fillStyle = R ? '#3f8f5a' : '#d94f3d';
  g.beginPath();
  g.arc(200, 392, 12, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#f4ead8';
  g.fillRect(194, 384, 12, 6);
  g.fillStyle = '#2b2350';
  g.fillRect(198, 376, 4, 8);

  // A jumping fish, right picture only.
  if (R) {
    g.fillStyle = '#9fc6d8';
    g.beginPath();
    g.ellipse(430, 378, 14, 6, -0.5, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.moveTo(442, 372);
    g.lineTo(452, 366);
    g.lineTo(450, 378);
    g.closePath();
    g.fill();
    g.strokeStyle = 'rgba(255, 246, 216, 0.8)';
    g.beginPath();
    g.arc(430, 396, 12, Math.PI, 0);
    g.stroke();
  }
}
