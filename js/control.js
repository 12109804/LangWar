// 下keyを入力した瞬間だけ実行し、押しっぱなしは実行しない
let isSoftDropping = false;

// 横移動(左右移動処理)
// 左移動
function canMoveLeft() {
    // x左端なら止める
    if (currentPiece.x <= 0)
        return false;
    // 左側にブロックがあれば止める
    if (board[currentPiece.y][currentPiece.x - 1] !== 0) {
        return false;
    }
    // それ以外はOK
    return true;
}

// 右移動
function canMoveRight() {
    // xが右端なら止める
    if (currentPiece.x >= COLS - 1)
        return false;
    // 右側にブロックがあれば止める
    if (board[currentPiece.y][currentPiece.x + 1] !== 0) {
        return false
    }
    // それ以外はOK
    return true;
}



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