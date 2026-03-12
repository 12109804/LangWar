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

// 回転関数
export function rotateMatrix(matrix) {
    // 回転時に動く最大値を取得(x,y)
    const rows = matrix.length;
    const cols = matrix[0].length;
    // 空の配列をつくる
    const rotated = [];
    // 外側ループで行をつくる
    for (let col = 0; col < cols; col++) {
        rotated[col] = [];
    // 内側ループで元の行を逆順に読む
        for (let row = rows - 1; row >= 0; row--) {
            // 新しい配列に逆順に並べながら配列を構築
            rotated[col].push(matrix[row][col]);
        } 
    }
    return rotated;   /* 配列を返す */
}