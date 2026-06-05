# 🛡️ Neon Core Evolution: Flappy Glitch

[![Multiplayer: Playroom SDK](https://img.shields.io/badge/Multiplayer-Playroom%20SDK-ff0055?style=for-the-badge&logo=javascript)](https://joinplayroom.com)
[![Tech: HTML5 Canvas](https://img.shields.io/badge/Tech-HTML5%20Canvas-00f3ff?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Audio: Web Audio API](https://img.shields.io/badge/Audio-Web%20Audio%20API-00ffaa?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

A premium, fast-paced, cyberpunk-themed **HTML5 Canvas 2D Tower Defense & Reflector** game. Defend the central core using an orbital shield, trigger devastating ultimate abilities, and coordinate with your teammate in **real-time online multiplayer**!

When the tempo spikes and the combo multiplier hits **25**, a temporal anomaly triggers **Flappy Glitch Mode**, morphing the defense grid into an action-packed neon obstacle course!

---

## 🎮 Game Play & Visual Preview

- **Cyberpunk Aesthetics:** Fluid 60FPS particle explosions, modern glassmorphism UI, glowing neon trails, and dynamic camera shakes.
- **Dynamic Synthesizer:** Real-time generated synthetic sound effects (lasers, freezes, shockwaves, jumps, and explosions) built entirely with vanilla JavaScript utilizing the **Web Audio API** (paired with immersive background beats).
- **Core Evolution:** Watch the center core evolve into advanced geometric shapes (rotating star/shielded square) as your combo score climbs, spawning helper **Orbital Support Drones**.

---

## 🕹️ Controls & Abilities

Command the arena using these tactical inputs:

| Action | Control (PC) | Control (Mobile) | Energy Cost | Description |
| :--- | :--- | :--- | :---: | :--- |
| **Shield Orbit** | `Mouse Movement` | `Drag / Slide` | *Passive* | Rotates the neon energy shield to intercept and reflect projectiles. |
| **Core Shockwave** | `Spacebar` | `Double Tap` | **100 Energy** | Releases a massive, screen-clearing kinetic pulse from the Core. |
| **Cryo Freeze** | `F` | — | **30 Energy** | Freezes all active hostile threats in place (8s cooldown). |
| **Temporal Slow-Mo** | `Shift` | — | **50 Energy** | Dilates time, slowing down all incoming projectiles. |
| **Tactical Dash** | `Right Click` | — | *Free* | Instantly dashes the shield into position (2s cooldown). |
| **Glitch Jump** | `Spacebar` | `Tap Screen` | *Passive* | Flaps / Jumps to navigate obstacles in **Flappy Glitch Mode**. |

---

## ✨ Features & Mechanics

### 👥 Real-Time Online Co-Op Multiplayer
Powered by **Playroom SDK (v0.0.96)**, jump into lobby-based cooperative action instantly.
- **Host-Guest Synchronization:** Seamlessly syncs scores, combo strings, active enemy grids, player shields, and power-up occurrences.
- **Color Customization:** Express yourself by selecting your custom player theme color upon lobby entry.
- **Co-op Tactics:** Overlap shields with your partner to defend the core from multiple angles or synchronize shockwaves for massive field clears.

### ⚡ Combat Evolutions
- **Shield Overcharge:** Rapid successive reflections overcharge your defense grids, widening your deflection arc and dynamic reflection angles.
- **Combo Fury Mode:** Max out the combo meter to trigger a hyper-overcharged weapon state, doubling shield reflection speed and discharging **Chain Lightning** directly between enemies.
- **Evolving Threats:**
  - *Standard Swarm:* Classic grid drones.
  - *Armored Tanks:* Slow but highly durable.
  - *Phase Ghosts:* Phase shift, becoming invisible periodically.
  - *Splitter Hazards:* Glowing diamond-shaped projectiles that split into two mini-projectiles upon shield impact.
  - *Megastructure Bosses:* Colossal bosses firing rapid-fire barrages and carrying thick armor plating.

### 🌀 Flappy Glitch Dimension
Reaching a **25x Combo** tears a rift in the core's firewall, transforming the interface into a neon-tinted scrolling flappy-obstacle course.
- Coordinate with your teammate to jump through narrow energy columns.
- Defeating the glitch restores full health to the Core and unlocks high-tier multipliers!

---

## 🛠️ Tech Stack & Architecture

- **Core Engine:** Pure Vanilla JavaScript (zero engines, zero external rendering frameworks).
- **Graphics Pipeline:** Ultra-performant HTML5 Canvas 2D context with custom neon glows (`shadowBlur`) and active particle pool allocators.
- **Networking Serverless:** Playroom SDK for low-latency peer synchronization.
- **Procedural Sound FX:** Dynamic frequency oscillation using Web Audio API synthesis.
- **Design System:** Sleek, modern Glassmorphic and Claymorphic CSS elements for high-end HUD aesthetics.

---

## 🚀 Getting Started

No installations or local servers are required to play single-player! To play with friends or host online multiplayer, follow these simple setup instructions:

### Local Hosting & Development
1. Clone this repository to your machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/neon-core-evolution.git
   cd neon-core-evolution
   ```

2. Spin up a lightweight local development web server:
   *Using Python:*
   ```bash
   python -m http.server 8000
   ```
   *Using Node.js (Live Server):*
   ```bash
   npx live-server
   ```

3. Open your browser and navigate to `http://localhost:8000`.

### Deploying to Production
You can host this single-page multiplayer game absolutely free on:
- **GitHub Pages** (Enable Pages under your repository settings)
- **Vercel** or **Netlify** (Just drag-and-drop the directory)

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
