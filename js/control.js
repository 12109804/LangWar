import { forEachBlock } from "./utils.js";

// 下keyを入力した瞬間だけ実行し、押しっぱなしは実行しない
let isSoftDropping = false;

// 横移動(左右移動処理)
// 左移動
export function canMoveLeft() {
    let can = true
    
    forEachBlock(currentPiece.shape, (dy,dx) => {
        const newY = currentPiece.y + dy;
        const newX = currentPiece.x + dx - 1;
        // 左端または、左側にブロックがあれば止める
        if (newX < 0 || board[newX][newY] !== 0) {
            can = false;
        }
    });
    return can;
}; 

// 右移動
export function canMoveRight() {
    let can = true

    forEachBlock(currentPiece,shape, (dy,dx) => {
        const newY = currentPiece.y + dy;
        const newX = currentPiece.x + dx + 1;
        // 右端または、右側にブロックがあれば止める
        if (newX >= COLS || board[newY][newX] !== 0) { 
            can = true
        }
    });
    return can;
};


// キーボード入力
// キーが押された瞬間関数を実行
document.addEventListener("keydown",(event) => {

    // ゲームオーバーなら操作を無効化
    if (gameOver) return;
    // ←入力で関数を実行し、左へ１マス移動
    if (event.key === "ArrowLeft") {
        if (canMoveLeft()) {
            currentPiece.x--;
        }
    }
    // →入力で関数を実行し、右へ１マス移動
    if (event.key === "ArrowRight") {
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
        dropSpeed = 100;
        // 加速を実行
        startGravity();
    }
    // 画面の描画を行う（見た目を滑らかにするため）
        render();
});

// キーを離した時の挙動
document.addEventListener("keyup", (event) => {

    if (event.key === "ArrowDown") {

        isSoftDropping = false;

        clearInterval(dropInterval);
        dropSpeed = 1000;
        startGravity();
    }
});