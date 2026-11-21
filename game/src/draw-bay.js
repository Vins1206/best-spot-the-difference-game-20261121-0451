// Lantern Harbour — Scene 3 art: Moonlit Ferry Bay.
// One 560x450 panel, plain canvas shapes. The right picture carries the
// differences: a cratered moon, a third funnel stripe, a dark pier lamp,
// a fishing net, an extra star, and a square cabin window — while the rope
// coil sits on the jetty in the left picture only.

export function drawBay(g, side) {
  const R = side === 1;
  const W = 560;
  const H = 450;

  // Night sky.
  const sky = g.createLinearGradient(0, 0, 0, 250);
  sky.addColorStop(0, '#0e1428');
  sky.addColorStop(1, '#274067');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, 250);
  g.fillStyle = '#fff6d8';
  const stars = [[40, 40], [150, 30], [210, 55], [260, 28], [330, 48], [480, 40], [530, 80], [60, 120], [180, 110], [300, 90], [360, 130], [500, 120]];
  for (const [x, y] of stars) {
    g.beginPath();
    g.arc(x, y, 1.8, 0, Math.PI * 2);
    g.fill();
  }
  // Extra star, right picture only.
  if (R) {
    g.beginPath();
    g.arc(420, 62, 2.4, 0, Math.PI * 2);
    g.fill();
  }

  // Moon with a crater on the right picture.
  g.fillStyle = '#f4ead8';
  g.beginPath();
  g.arc(100, 82, 30, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(244, 234, 216, 0.18)';
  g.beginPath();
  g.arc(100, 82, 42, 0, Math.PI * 2);
  g.fill();
  if (R) {
    g.fillStyle = '#cfc3a5';
    g.beginPath();
    g.arc(110, 74, 6, 0, Math.PI * 2);
    g.arc(92, 92, 4, 0, Math.PI * 2);
    g.fill();
  }

  // Moon path on the sea.
  g.fillStyle = 'rgba(244, 234, 216, 0.20)';
  g.fillRect(88, 250, 24, 200);

  // Sea.
  const sea = g.createLinearGradient(0, 250, 0, H);
  sea.addColorStop(0, '#2a4a68');
  sea.addColorStop(1, '#12283e');
  g.fillStyle = sea;
  g.fillRect(0, 250, W, 200);
  g.strokeStyle = 'rgba(255, 246, 216, 0.45)';
  g.lineWidth = 2;
  for (const [x, y, len] of [[40, 280, 50], [180, 300, 60], [440, 280, 56], [60, 420, 66], [330, 420, 58], [460, 400, 50]]) {
    g.beginPath();
    g.moveTo(x, y);
    g.quadraticCurveTo(x + len / 2, y - 5, x + len, y);
    g.stroke();
  }

  // The ferry.
  g.fillStyle = '#1e3a52';
  g.beginPath();
  g.moveTo(200, 310);
  g.lineTo(440, 310);
  g.lineTo(420, 360);
  g.lineTo(220, 360);
  g.closePath();
  g.fill();
  g.fillStyle = '#c65f6e';
  g.fillRect(200, 310, 240, 8);
  // Cabin.
  g.fillStyle = '#f4ead8';
  g.fillRect(280, 215, 120, 95);
  g.fillStyle = '#2b2350';
  g.fillRect(280, 215, 120, 10);
  // Cabin window: round on the left, square on the right.
  g.fillStyle = '#ffd98a';
  if (R) {
    g.fillRect(348, 220, 24, 24);
  } else {
    g.beginPath();
    g.arc(360, 232, 13, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#3f6d8e';
  g.fillRect(292, 250, 18, 40);
  // Funnel with the stripe difference.
  g.fillStyle = '#d94f3d';
  g.fillRect(288, 155, 26, 60);
  g.fillStyle = '#2b2350';
  g.fillRect(288, 155, 26, 10);
  g.fillStyle = '#f4ead8';
  g.fillRect(288, 178, 26, 6);
  if (R) g.fillRect(288, 194, 26, 6);
  // Portholes along the hull.
  g.fillStyle = '#ffd98a';
  for (const x of [232, 262, 292, 322, 352, 382, 412]) {
    g.beginPath();
    g.arc(x, 336, 6, 0, Math.PI * 2);
    g.fill();
  }
  // Ferry wake.
  g.strokeStyle = 'rgba(255, 246, 216, 0.55)';
  g.beginPath();
  g.moveTo(200, 366);
  g.quadraticCurveTo(150, 372, 110, 366);
  g.moveTo(440, 366);
  g.quadraticCurveTo(480, 372, 510, 364);
  g.stroke();

  // Pier on the right with the lamp difference.
  g.fillStyle = '#5d4632';
  g.fillRect(452, 318, 108, 14);
  g.fillStyle = '#4a3626';
  g.fillRect(464, 332, 8, 34);
  g.fillRect(540, 332, 8, 34);
  g.fillStyle = '#2b2350';
  g.fillRect(476, 300, 8, 20);
  g.fillStyle = R ? '#3a2f4d' : '#ffd98a';
  g.beginPath();
  g.arc(480, 296, 9, 0, Math.PI * 2);
  g.fill();
  if (!R) {
    g.fillStyle = 'rgba(255, 217, 138, 0.28)';
    g.beginPath();
    g.arc(480, 296, 22, 0, Math.PI * 2);
    g.fill();
  }

  // Sandy corner with the fishing net, right picture only.
  g.fillStyle = '#8a6a4a';
  g.beginPath();
  g.moveTo(0, 380);
  g.lineTo(190, 380);
  g.lineTo(150, 450);
  g.lineTo(0, 450);
  g.closePath();
  g.fill();
  if (R) {
    g.strokeStyle = '#d8c8a8';
    g.lineWidth = 1.5;
    g.beginPath();
    for (let i = 0; i <= 4; i++) {
      g.moveTo(110 + i * 18, 372);
      g.lineTo(104 + i * 18, 408);
    }
    for (let j = 0; j <= 3; j++) {
      g.moveTo(108, 374 + j * 11);
      g.lineTo(182, 374 + j * 11);
    }
    g.stroke();
    g.strokeStyle = '#8a6a4a';
    g.beginPath();
    g.ellipse(146, 390, 42, 18, 0, 0, Math.PI * 2);
    g.stroke();
  }

  // Little jetty with the rope coil, left picture only.
  g.fillStyle = '#5d4632';
  g.fillRect(210, 396, 92, 12);
  g.fillStyle = '#4a3626';
  g.fillRect(222, 408, 8, 26);
  g.fillRect(282, 408, 8, 26);
  if (!R) {
    g.strokeStyle = '#c9a86a';
    g.lineWidth = 4;
    g.beginPath();
    g.arc(252, 392, 12, 0, Math.PI * 2);
    g.arc(252, 392, 6, 0, Math.PI * 2);
    g.stroke();
  }
}
