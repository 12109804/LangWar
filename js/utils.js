// ブロックデータをcallbackに渡す関数
export function forEachBlock(currentPiece,callback) {
        // ピースの情報を取得（形）
        const shape = currentPiece.shape;
        // ピースのshapeのマスをループ処理で取得（座標）
        for (let dy = 0; dy < shape.length; dy++) {
            for(let dx = 0; dx < shape[dy].length; dx++) {
                // ブロックの存在するマスに処理を追加[1の場所のみ]
                if (shape[dy][dx] !== 0) {
                // 盤面上の座標を計算（形と位置情報の統合）
                    const boardY = currentPiece.y + dy
                    const boardX = currentPiece.x + dx
                    // コールバックでデータ（４つ）を渡す
                    callback(boardX, boardY,dx,dy)
            }
        }
    }
}

// 横移動(左右移動処理)
// 左移動
export function canMoveLeft() {
    let can = true
    
    forEachBlock(currentPiece, (boardX, boardY, dx, dy) => {
        const newX = boardX + dx - 1;
        const newY = boardY + dy;
        // 左端または、左側にブロックがあれば止める
        if (newX < 0 || board[newY][newX] !== 0) {
            can = false;
        }
    });
    return can;
}; 

// 右移動
export function canMoveRight() {
    let can = true

    forEachBlock(currentPiece, (boardX, boardY, dx, dy) => {
        const newX = boardX + dx + 1;
        const newY = boardY + dy;
        // 右端または、右側にブロックがあれば止める
        if (newX >= COLS || board[newY][newX] !== 0) { 
            can = false;
        }
    });
    return can;
};

