# 🐍 Retro Arcade Snake Game

A high-performance, modern web-based implementation of the classic retro Snake Game built using pure JavaScript (ES6+), HTML5, and CSS Grid. Optimized for smooth rendering, zero input lag, and interactive audio feedbacks.

## 🌟 Key Features

*   **Smart Warm-up State:** The game initializes in a frozen state upon clicking "Start". The snake will only start moving once the player makes their first intentional directional input.
*   **Anti-Self-Collision Lock:** Built-in validation system (`lastExecutedDirection`) that blocks immediate reverse inputs, preventing accidental instant game-overs.
*   **Dynamic Difficulty Module:** Choose between *Easy (0.8x)*, *Medium (1.0x)*, and *Hard (1.5x)* speeds to challenge your reflexes.
*   **Immersive Audio Feedback:** Fully synchronized audio tracks for movement, fruit eating, ambient background scores, and game-over states.
*   **Responsive Input Architecture:** Supports dual-input setups using standard Desktop Keyboard mapping (`Arrow Keys` / `WASD`) as well as mobile-friendly D-pads.
*   **Intelligent Food Spawning:** Pure recursive algorithmic placement ensures that fruit never spawns on top of the snake's dynamic body array.

---

## 🎮 How To Play

1. **Launch the Game:** Click on the **Start / Restart** button.
2. **Prepare & Choose:** Select your preferred difficulty level on the home screen interface.
3. **The First Move:** The snake stays stationary at the center of the grid until you trigger an action. Press any control key to begin.
4. **Control Mapping:**
    *   **Move Up:** `ArrowUp` or `W`
    *   **Move Down:** `ArrowDown` or `S`
    *   **Move Left:** `ArrowLeft` or `A`
    *   **Move Right:** `ArrowRight` or `D`
5. **Objective:** Eat food to gain points (+10 per fruit) and grow longer. Avoid hitting the borders or crashing into your own tail.

---

## 📂 Project Architecture

```text
├── index.html          # Core structural layout and UI overlay viewports
├── style.css           # Grid matrix configs, layout view adapters & responsive UI
├── script.js          # Main game engine, collision physics & audio managers
├── food.mp3            # Audio effect triggered on food consumption
├── gameover.mp3        # Audio effect triggered on matrix boundary/tail crash
├── move.mp3            # Soft audio click response for directional keypresses
└── music.mp3           # Dynamic loop track for atmospheric background ambient
