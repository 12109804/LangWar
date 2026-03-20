import { 
    currentPiece, 
    gameOver, 
    startGravity,
    render,
    dropInterval,
    dropSpeed,
} from "./state.js";
import { forEachBlock, rotateMatrix, canPlace} from "./utils.js";
import { board, COLS, ROWS } from "./board.js";
import {kicksI, kicksNormal} from "./wallkick.js"


// 下keyを入力した瞬間だけ実行し、押しっぱなしは実行しない
let isSoftDropping = false;
let isMovingLeft = false;
let isMovingRight = false;
let isRotateRight = false

/// 左移動
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

// 回転(SRS system) 
export function rotateRight() {
    // ピースの向きを定義（未定義なら０をいれる）向き(上0,右1,下2,左3)
    if (currentPiece.rotation == null) {
        currentPiece.rotation = 0;
    }
    // 古い向きから新しい向きを決める
    const oldRotation = currentPiece.rotation;
    // 右回転で+1、4で割ったあまりにすることで０にする
    const newRotation = (oldRotation + 1) % 4;
    // pieceのshapeを回転させる
    const rotated = rotateMatrix(currentPiece.shape);
    // Iブロックかどうか判定
    const isI = currentPiece.name === "I";
    // キーを作成
    const key = `${oldRotation}->${newRotation}`;
    // 正しい壁キックを選ぶ
    const kicks = isI ? kicksI[key] : kicksNormal[key];

    // キックの候補を順に試す(新しい座標を構築)
    for (let kick of kicks) {
        const newX = currentPiece.x + kick.x;
        const newY = currentPiece.y + kick.y;
    // 新しい座標に置けるか判定
        if (canPlace(newX, newY, rotated)) {
            currentPiece.x = newX;
            currentPiece.y = newY;
            currentPiece.shape = rotated;
            currentPiece.rotation = newRotation;
            return; 
        }
    }
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
    // ↑入力で関数を実行し、右に90度回転
    if (event.key === "ArrowUp" &&! isRotateRight) {
        isRotateRight = true;
        rotateRight();
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
        // ソフトドロップ解除時だけ落下速度を戻す
        clearInterval(dropInterval);  /* インターバルを止める */
        dropSpeed.value = 1000;       /* 速度を戻す */
        startGravity();               /* 落下再開 */
    }
    if (event.key === "ArrowUp") {
        isRotateRight = false;
    }
});
