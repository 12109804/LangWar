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


