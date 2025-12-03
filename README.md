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
  * Uses the official 16 Hasbro Boggle dice for authentic gameplay.
* ✔ **Smart Path Validation**
  * Ensures players can only select letters that are adjacent (horizontally, vertically, or diagonally) to the last selected tile, and prevents reusing the same die in a single word.
* ✔ **Dictionary Verification**
  * Instantly checks submitted words against a built-in English dictionary (`dictionary-yawl.txt`) using efficient Set lookups to reject invalid words.
* ✔ **3-Minute Timer**
  * Adds excitement with a countdown timer. The game board automatically locks (disables interaction) when the time hits 0:00.
* ✔ **Duplicate Prevention**
  * Tracks found words and alerts the player if they try to submit a word they have already found.
* ✔ **Highest Score Tracking**
  * The game tracks the highest score achieved during the session and displays it beside the current score.
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

## <a id="project-structure"></a> 📂 Project Structure
