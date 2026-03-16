import { 
    spawnPiece,
    currentPiece,
    canMoveDown,
    gameOver,
    fixPiece,
    render,
    startGravity
} from "./state.js"

import { forEachBlock } from "./utils.js";
import { ROWS, COLS, board,} from "./board.js";
import "./control.js";

// 実行
document.addEventListener("DOMContentLoaded", () => {
    spawnPiece();
    render(); 
    startGravity();
})






