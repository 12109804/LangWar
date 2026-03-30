import { 
    spawnPiece,
    currentPiece,
    canMoveDown,
    gameOver,
    fixPiece,
    render,
    startGravity,
    initGame
} from "./state.js"

import { forEachBlock } from "./utils.js";
import { ROWS, COLS, board,} from "./board.js";
import "./control.js";

// 実行
document.addEventListener("DOMContentLoaded", () => {
    const $startBtn = document.getElementById("start-btn");
    const $startScreen = document.getElementById("start-screen");
    const $gameScreen = document.getElementById("game-screen");

    $startBtn.addEventListener("click", () => {
        $startScreen.style.display = "none";
        $gameScreen.style.display = "block";
        initGame();
    });
});





