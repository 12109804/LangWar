import { score } from "../game/score.js";


export function showGameOverScreen() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("gameOver-screen").style.display = "flex";

    // スコアを表示
    document.getElementById("final-score").textContent = score.toString().padStart(0,"0");
}

export function hideGameOverScreen() {
    document.getElementById("gameOver-screen").style.display = "none";
}