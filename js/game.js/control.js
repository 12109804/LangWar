import { 
    currentPiece, 
    gameOver, 
    startGravity,
    render,
    dropInterval,
    dropSpeed,
} from "./state.js";
import { forEachBlock, rotateMatrix } from "./utils.js";
import { board, COLS } from "./board.js";

// 下keyを入力した瞬間だけ実行し、押しっぱなしは実行しない
let isSoftDropping = false;
let isMovingLeft = false;
let isMovingRight = false;


// 左移動
export function canMoveLeft() {
    let can = true;
    
    forEachBlock(currentPiece, (boardX, boardY) => {
        const newX = boardX - 1;
        // 左端または、左側にブロックがあれば止める
        if (newX < 0 || board[boardY][newX] !== 0) {
            can = false;
        }
    });
    return can;
}

// 右移動
export function canMoveRight() {
    let can = true;

    forEachBlock(currentPiece, (boardX, boardY) => {
        const newX = boardX + 1;
        // 右端または、右側にブロックがあれば止める
        if (newX >= COLS || board[boardY][newX] !== 0) { 
            can = false;
        }
    });
    return can;
}

// 回転
export function rotatePiece() {
    // pieceのshapeを回転させる
    const rotated = rotatePiece(currentPiece.shape);
    // 回転後の形が置けるかチェックする
    if(canPiece(currentPiece.x, currentPiece.y, rotated)) {
        currentPiece.shape = rotated;
    }
}

// 回転時の衝突チェック関数（重要）
export function canPiece(currentPiece, board, COLS, ROWS) {
    let can = true;

    forEachBlock(currentPiece, (boardX, boardY) => {

        // 左右の壁チェック
        if (boardX < 0 || boardX >= COLS) {
            can = false;
            return;
        }

        // 下の壁チェック
        if (boardY < 0 || boardY >= ROWS) {
            can = false;
            return;
        }

        // 他のブロックとの衝突チェック
        if (board[boardY][boardX] !== 0) {
            can = false;
            return;
        }
    });

    return can;
}


// キーボード入力  キーが押された瞬間関数を実行
document.addEventListener("keydown",(event) => {

    // ゲームオーバーなら操作を無効化
    if (gameOver) return;
    // ←入力で関数を実行し、左へ１マス移動
    if (event.key === "ArrowLeft" &&! isMovingLeft) {
        isMovingLeft = true;
        if (canMoveLeft()) {
            currentPiece.x--;
        }
    }
    // →入力で関数を実行し、右へ１マス移動
    if (event.key === "ArrowRight" &&! isMovingRight) {
        isMovingRight = true;
        if (canMoveRight()) {
            currentPiece.x++;
        }
    }
    // ↓入力で速度を高速化
    if (event.key === "ArrowDown" &&! isSoftDropping) {
        isSoftDropping = true
        // インターバルを止める
        clearInterval(dropInterval);
        // 速度を加速
        dropSpeed.value = 100;
        // 加速を実行
        startGravity();
    }
    // 画面の描画を行う（見た目を滑らかにするため）
        render();
});

// キーを離した時の挙動
document.addEventListener("keyup", (event) => {
    
    if (event.key === "ArrowLeft") {
        isMovingLeft = false;
    }
    if (event.key === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.key === "ArrowDown") {
        isSoftDropping = false;

        clearInterval(dropInterval);
        dropSpeed.value = 1000;
        startGravity();
    }
});
