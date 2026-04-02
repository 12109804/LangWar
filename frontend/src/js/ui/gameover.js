import { initBoard } from "../game/board.js";
import { resatScore } from "../game/score.js";
import { gameState, initGame } from "../game/state.js";


// ゲームオーバー関数
export function showGameOverScreen() {
    // ゲーム画面の非表示
    document.getElementById("gameOver-screen").style.display = "flex";

    // スコアを表示
    document.getElementById("final-score").textContent = score.toString().padStart(0,"0");
}

// ゲームオーバー画面の非表示関数
export function hideGameOverScreen() {
    document.getElementById("gameOver-screen").style.display = "none";
}

// リトライ関数
function restartGame() {
    hideGameOverScreen();
    
    gameState.gameOver = false;  /* インターバルの停止 */ 
    
    initBoard();
    initGame();
}

// リスタート
document.getElementById("retry-btn").addEventListener("click", () => {
    restartGame();
})



// タイトル関数



