import { initBoard } from "../game/board.js";
import { score } from "../game/score.js";
import { dropInterval, gameState, initGame } from "../game/state.js";


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


// タイトル画面に戻る関数
function backToTitle() {
    hideGameOverScreen();

    // ゲームの停止
    gameState.gameOver = false;
    if (dropInterval) clearInterval(dropInterval);
    // スコアと盤面のリセット
    restartGame();
    initBoard();
    // 画面の切り替え
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "flex";
}

//ボタンイベント
document.getElementById("back-title-btn").addEventListener("click",backToTitle)


