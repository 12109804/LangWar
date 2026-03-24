import { score } from "../game.js/score.js";

export function updateScoreUI() {
    document.getElementById("score-value").textContent =
    score.toString().padStart(6, "0");
}

