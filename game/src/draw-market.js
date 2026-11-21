// Lantern Harbour — Scene 2 art: Lantern Night Market.
// One 560x450 panel, plain canvas shapes. The right picture carries the
// differences: a gold lantern, a cat on the roof, a SOUP sign, a fourth
// apple, a dark string bulb, a red vendor cap, and a paper kite.

export function drawMarket(g, side) {
  const R = side === 1;
  const W = 560;
  const H = 450;

  // Night sky.
  const sky = g.createLinearGradient(0, 0, 0, 200);
  sky.addColorStop(0, '#141a33');
  sky.addColorStop(1, '#3a2a55');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, 200);
  g.fillStyle = '#fff6d8';
  for (const [x, y] of [[30, 30], [80, 55], [150, 28], [220, 45], [320, 26], [380, 52], [470, 30], [530, 55], [110, 80], [260, 75]]) {
    g.beginPath();
    g.arc(x, y, 1.8, 0, Math.PI * 2);
    g.fill();
  }
  // Small moon.
  g.fillStyle = '#ffe9a3';
  g.beginPath();
  g.arc(60, 48, 18, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#e8c878';
  g.beginPath();
  g.arc(54, 44, 4, 0, Math.PI * 2);
  g.arc(66, 54, 3, 0, Math.PI * 2);
  g.fill();

  // Paper kite, right picture only.
  if (R) {
    g.strokeStyle = '#f4ead8';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(500, 78);
    g.quadraticCurveTo(505, 120, 488, 150);
    g.stroke();
    g.fillStyle = '#3f8f7a';
    g.beginPath();
    g.moveTo(500, 46);
    g.lineTo(516, 62);
    g.lineTo(500, 78);
    g.lineTo(484, 62);
    g.closePath();
    g.fill();
    g.strokeStyle = '#d94f3d';
    g.beginPath();
    g.moveTo(500, 46);
    g.lineTo(500, 78);
    g.moveTo(484, 62);
    g.lineTo(516, 62);
    g.stroke();
  }

  // String lights across the top.
  g.strokeStyle = '#2b2350';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, 48);
  g.quadraticCurveTo(280, 96, 560, 48);
  g.stroke();
  const bulbs = [60, 120, 180, 240, 280, 340, 400, 460, 520];
  for (const x of bulbs) {
    const y = 48 + Math.sin((x / 560) * Math.PI) * 44 - 6;
    const dark = R && x === 280;
    g.fillStyle = dark ? '#3a2f4d' : '#ffd98a';
    g.beginPath();
    g.arc(x, y + 8, 6, 0, Math.PI * 2);
    g.fill();
    if (!dark) {
      g.fillStyle = 'rgba(255, 217, 138, 0.25)';
      g.beginPath();
      g.arc(x, y + 8, 12, 0, Math.PI * 2);
      g.fill();
    }
  }

  // Rooftops.
  g.fillStyle = '#2e2440';
  g.beginPath();
  g.moveTo(0, 200);
  g.lineTo(90, 150);
  g.lineTo(180, 200);
  g.closePath();
  g.fill();
  g.beginPath();
  g.moveTo(400, 200);
  g.lineTo(470, 108);
  g.lineTo(540, 200);
  g.closePath();
  g.fill();

  // Cat on the right roof, right picture only.
  if (R) {
    g.fillStyle = '#141a33';
    g.beginPath();
    g.ellipse(450, 100, 16, 10, 0, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.arc(464, 88, 8, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.moveTo(458, 82);
    g.lineTo(460, 74);
    g.lineTo(464, 81);
    g.moveTo(466, 81);
    g.lineTo(470, 74);
    g.lineTo(471, 82);
    g.closePath();
    g.fill();
    g.beginPath();
    g.moveTo(434, 100);
    g.quadraticCurveTo(424, 88, 432, 80);
    g.strokeStyle = '#141a33';
    g.lineWidth = 3;
    g.stroke();
  }

  // Hanging paper lanterns.
  const lanternXs = [100, 140, 180, 320, 360, 400];
  for (const x of lanternXs) {
    g.strokeStyle = '#2b2350';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(x, 88);
    g.lineTo(x, 100);
    g.stroke();
    const gold = R && x === 140;
    g.fillStyle = gold ? '#e8b23a' : '#d94f3d';
    g.beginPath();
    g.ellipse(x, 116, 14, 17, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = gold ? '#c98f1e' : '#a83a2c';
    g.fillRect(x - 14, 112, 28, 3);
    g.fillRect(x - 14, 122, 28, 3);
    g.fillStyle = '#ffd98a';
    g.fillRect(x - 4, 96, 8, 5);
  }

  // Market ground.
  g.fillStyle = '#4a3626';
  g.fillRect(0, 330, W, 120);
  g.fillStyle = '#5d4632';
  for (let x = 0; x < W; x += 56) {
    g.fillRect(x, 380, 28, 4);
    g.fillRect(x + 28, 420, 28, 4);
  }

  // Left stall: fruit basket with the apple difference.
  g.fillStyle = '#7a5a3a';
  g.fillRect(40, 240, 120, 90);
  g.fillStyle = '#a8763e';
  g.fillRect(34, 228, 132, 16);
  g.fillStyle = '#8a4a3a';
  g.fillRect(52, 330, 84, 22);
  g.fillStyle = '#6a3626';
  g.beginPath();
  g.ellipse(94, 330, 42, 10, 0, Math.PI, 0);
  g.fill();
  const apples = R ? [[72, 322], [94, 316], [116, 322], [104, 306]] : [[72, 322], [94, 316], [116, 322]];
  g.fillStyle = '#d94f3d';
  for (const [x, y] of apples) {
    g.beginPath();
    g.arc(x, y, 9, 0, Math.PI * 2);
    g.fill();
  }
  g.fillStyle = '#3f8f5a';
  g.fillRect(92, 304, 3, 8);

  // Centre stall with the sign difference.
  g.fillStyle = '#6a4a58';
  g.fillRect(230, 250, 140, 80);
  g.fillStyle = '#3f8f7a';
  g.fillRect(224, 238, 152, 16);
  g.fillStyle = '#f4ead8';
  g.fillRect(262, 196, 76, 30);
  g.strokeStyle = '#2b2350';
  g.lineWidth = 2;
  g.strokeRect(262, 196, 76, 30);
  g.fillStyle = '#2b2350';
  g.font = 'bold 20px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(R ? 'SOUP' : 'TEA', 300, 212);
  // Jars on the counter.
  g.fillStyle = '#c65f6e';
  g.fillRect(244, 306, 18, 24);
  g.fillStyle = '#e8b23a';
  g.fillRect(270, 306, 18, 24);
  g.fillStyle = '#3f8f7a';
  g.fillRect(296, 306, 18, 24);

  // Vendor behind the centre stall, hat difference.
  g.fillStyle = '#e8b98a';
  g.beginPath();
  g.arc(382, 244, 16, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#3a2f4d';
  g.beginPath();
  g.arc(376, 242, 2, 0, Math.PI * 2);
  g.arc(388, 242, 2, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#3a2f4d';
  g.lineWidth = 1.5;
  g.beginPath();
  g.arc(382, 250, 6, 0.2, Math.PI - 0.2);
  g.stroke();
  if (R) {
    g.fillStyle = '#d94f3d';
    g.beginPath();
    g.arc(382, 234, 17, Math.PI, 0);
    g.fill();
    g.fillRect(382, 228, 22, 5);
  } else {
    g.fillStyle = '#e8c878';
    g.beginPath();
    g.ellipse(382, 232, 24, 7, 0, Math.PI, 0);
    g.fill();
    g.fillStyle = '#c98f1e';
    g.fillRect(374, 224, 16, 8);
  }
  g.fillStyle = '#3f6d8e';
  g.beginPath();
  g.moveTo(360, 268);
  g.lineTo(404, 268);
  g.lineTo(412, 300);
  g.lineTo(352, 300);
  g.closePath();
  g.fill();

  // Right stall: cloth and pots.
  g.fillStyle = '#5a3a4a';
  g.fillRect(430, 250, 110, 80);
  g.fillStyle = '#c65f6e';
  g.fillRect(424, 238, 122, 16);
  g.fillStyle = '#2b2350';
  g.beginPath();
  g.arc(460, 312, 12, 0, Math.PI * 2);
  g.arc(500, 312, 12, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#8fa3b8';
  g.fillRect(452, 296, 16, 6);
  g.fillRect(492, 296, 16, 6);

  // Foreground lantern glow on the ground.
  g.fillStyle = 'rgba(255, 217, 138, 0.12)';
  g.beginPath();
  g.ellipse(280, 400, 180, 26, 0, 0, Math.PI * 2);
  g.fill();
}
