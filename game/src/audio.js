// Lantern Harbour — sounds: every effect is synthesised with WebAudio.
// No audio files, no network. One job: small pleasant blips for each event.

let audioContext = null;
let muted = false;

export function isMuted() {
  return muted;
}

export function toggleMuted() {
  muted = !muted;
  return muted;
}

function context() {
  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    audioContext = new AudioCtor();
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function tone(freq, startAt, length, kind, peak) {
  if (muted) return;
  const ctx = context();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = kind;
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + startAt;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + length);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + length + 0.05);
}

export function playFind() {
  tone(660, 0, 0.14, 'sine', 0.22);
  tone(880, 0.08, 0.2, 'sine', 0.22);
  tone(1320, 0.16, 0.22, 'triangle', 0.12);
}

export function playMiss() {
  tone(180, 0, 0.18, 'sawtooth', 0.08);
  tone(140, 0.1, 0.2, 'sawtooth', 0.07);
}

export function playHint() {
  tone(520, 0, 0.12, 'triangle', 0.14);
  tone(780, 0.09, 0.16, 'triangle', 0.14);
}

export function playClick() {
  tone(440, 0, 0.06, 'sine', 0.1);
}

export function playLevelClear() {
  tone(523, 0, 0.16, 'triangle', 0.18);
  tone(659, 0.12, 0.16, 'triangle', 0.18);
  tone(784, 0.24, 0.3, 'triangle', 0.18);
}

export function playWin() {
  const notes = [523, 659, 784, 1047, 784, 1047];
  notes.forEach((freq, i) => tone(freq, i * 0.13, 0.28, 'triangle', 0.18));
}

export function playTimeout() {
  tone(392, 0, 0.25, 'triangle', 0.16);
  tone(311, 0.2, 0.4, 'triangle', 0.16);
}
