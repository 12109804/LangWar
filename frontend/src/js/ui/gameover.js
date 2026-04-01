import { score } from "../game/score.js";

// ゲームオーバー関数
export function showGameOverScreen() {
    // ゲーム画面の非表示
    document.getElementById("gameOver-screen").style.display = "flex";

    // スコアを表示
    document.getElementById("final-score").textContent = score.toString().padStart(0,"0");
}

// ゲームオーバー画面の非表示
export function hideGameOverScreen() {
    document.getElementById("gameOver-screen").style.display = "none";
}

// リトライ関数


// タイトル関数



