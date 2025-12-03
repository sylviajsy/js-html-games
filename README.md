# 🎲 Boggle Game
A browser-based implementation of the classic Boggle word game, built with HTML, CSS, and JavaScript.

Players form valid English words by selecting adjacent letters on a 4×4 board generated using the official Hasbro Boggle dice. The game includes scoring, adjacency checking, word tracking, and a countdown timer.

## 📋 Table of Contents
- [Features](#features)
- [How to Play](#how-to-play)
- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
  
## <a id="features"></a> ✨ Features
* ✔ **Real Boggle Dice**
  * Uses the official 16 Hasbro Boggle dice with **Fisher-Yates Shuffle** algorithm.
* ✔ **Smart Path Validation**
  * **Adjacency Check**: Ensures letters are neighbors (horizontal, vertical, diagonal).
  * **Non-reuse**: Prevents using the same die twice in a single word.
  * **Dictionary Check**: Validates words against a loaded English dictionary (`dictionary-yawl.txt`) using efficient **Set** lookups ($O(1)$ complexity).
* ✔ **Persistent High Score**
  * Uses `localStorage` to save your highest score locally, keeping the challenge alive even after refreshing the page.
* ✔ **Real-Time Feedback**
  * **Timer**: A countdown timer derived from `Date` objects for accuracy.
  * **Live Clock**: Displays current real-world time.
  * **Status Messages**: Non-intrusive alerts for errors (e.g., "Not adjacent", "Word not found").
* ✔ **Automatic Scoring**
  * Scores are based on classic Boggle rules:
    | Word Length | Points |
    | :--- | :--- |
    | 3-4 letters | 1 |
    | 5 letters | 2 |
    | 6 letters | 3 |
    | 7 letters | 5 |
    | 8+ letters | 11 |

## <a id="how-to-play"></a> 🎮 How to Play


## <a id="installation"></a> 🚀 Installation


## <a id="tech-stack"></a> 🛠 Tech Stack
* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Styling Framework**: Bootstrap
* **Data Structures**: `Set` for dictionary lookups, `Array` for board management, `Object` for Game State.
* **APIs**:
    * **Fetch API**: To load the dictionary text file.
    * **Web Storage API**: To save high scores.
    * **Date Object**: For timer and real-time clock logic.

## <a id="project-structure"></a> 📂 Project Structure
