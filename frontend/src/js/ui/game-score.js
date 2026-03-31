import { score } from "../game/score.js";

export function updateScoreUI() {
    document.getElementById("score-value").textContent =
    score.toString().padStart("0");
}

