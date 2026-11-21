# Lantern Harbour — Spot the Difference

[![make.fun · best-spot-the-difference-game-20261121-0451](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Vins1206/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)
[![reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/Vins1206/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451?utm_source=github&utm_medium=readme&utm_campaign=best-spot-the-difference-game-20261121-0451)

An original spot-the-difference game built for the [make.fun](https://make.fun) bounty "Make the best spot the difference game" — $50 shared by the 10 best entries.

Two near-identical harbour pictures, drawn entirely in code, stand side by side. Seven differences hide in the right picture of each scene — a lighthouse beam gone dark, a flag that changed colour, an extra gull, a jumping fish, and more. Click a difference to ring it in gold; wrong clicks cost points and seconds.

Three scenes, 21 finds in all:

1. **Harbour at Dusk** — 180 seconds
2. **Lantern Night Market** — 150 seconds
3. **Moonlit Ferry Bay** — 120 seconds

Keyboard: **H** hint (−25 points), **R** restart, **N** next scene, **M** mute, **1–3** jump to a scene. Sounds are synthesised with WebAudio — no audio files, no network requests. The game runs from static files only.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in a desktop browser and play.

## Layout

- `main.ts` — hand-in program: copies `game/` and `screenshots/` to the output directory and writes `dossier.json`
- `game/` — the playable game (`index.html` + ES modules under `src/`)
- `screenshots/` — real renders of the game's own code
- `vendor/makefun-game.ts` — the make.fun dossier library, copied from the kit unchanged
