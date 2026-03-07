// 1.Board （盤面）データ構造 
const ROWS = 12; /* 行（縦） */
const COLS = 7; /* 列（横） */
// 配列を構築
let board = Array.from({length: ROWS }, () =>
    // 各行に長さ〇の配列をつくる（中身はすべて０）
    Array(COLS).fill(0)
);

// ブロックデータをcallbackに渡す関数
function forEachBlock(currentPiece,callback) {
    // ピースの情報を取得（形）
    const shape = PIECES.shape;
    // ピースのshapeのマスをループ処理で取得（座標）
    for (let dy = 0; dy < shape.length; dy++) {
        for(let dx = 0; dx < shape.length; dx++)
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

// 2.落下ブロック(最初のブロック)
let currentPiece = {
    x: 3,
    y: 0,
    shape: [[1,0],[1,0]]
};

// 3.落下ブロック（新しいブロック）
function spawnPiece() {
    // ピースの要素数を整数かつランダムに取得
    const randomIndex = Math.floor(Math.random() * PIECES.length);
    const PIECE = PIECES[randomIndex];
    // 新しいピースを生成
    currentPiece = {
        x: Math.floor(COLS / 2),
        y: 0,
        shape: PIECE.shape
        };
// 新しいブロックを置けない場合の処理（すでに固定ブロックがある場合）
    if (board[currentPiece.y][currentPiece.x] !== 0) {
        gameOver = true;
        // ゲームオーバーアラート
        alert("GAME OVER");
    };
}

// 4.落下ブロックの挙動
function canMoveDown() {
    let canMove = true;
    // 関数の呼び出し各ブロックを調べる
    forEachBlock(currentPiece, (x,y) => {
        const newY = y + 1;   
        /*１マス下へ行くとどうなるか調べる */
        // 一番下に到達、または下に固定ブロックがある場合falseを返す
        if (newY >= ROWS || board[newY][x] !== 0) {
            canMove = false
        }
    });
    return canMove;
}

// 5.固定処理
function fixPiece() {
    forEachBlock(currentPiece,(x,y) => {
        board[x][y] = 1;  /* 盤面に書き込む（１にする） */
    });
}

// 6.描画 render
function render() {
    // 画面先のHTMLの要素を取得
    const boardElement = document.getElementById("board");

    // グリッドレイアウト有効
    boardElement.style.display = "grid";
    // 列の数を表示、各列の幅固定
    boardElement.style.gridTemplateColumns = `repeat(${COLS}, 40px)`;
    // 描画（画面のリセット）
    boardElement.innerHTML = "";

    // 2重ループ（行から列)
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 毎回新しいマスをメモリ上に作成し、クラスを適応させる
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // 値が0以外の場合、クラスを適応　// 固定ブロック
            if (board[row][col] !== 0) {
                cell.classList.add("filled");
            }
            /// 落下ブロック（shape 全体）を描画
            if (currentPiece) {
                for (let dy = 0; dy < currentPiece.shape.length; dy++) {
                    for (let dx = 0; dx < currentPiece.shape[dy].length; dx++) {

                        // shape の中で 1 の部分だけ描画対象
                        if (currentPiece.shape[dy][dx] !== 0) {

                            // 盤面上の座標に変換
                            const pieceY = currentPiece.y + dy;
                            const pieceX = currentPiece.x + dx;

                            // 今描画しているマス(row,col)と一致したら current を付ける
                            if (row === pieceY && col === pieceX) {
                                cell.classList.add("current");
                            }
                        }
                    }
                }
            }
            // 作成されたマスをboardの中、末尾から順に追加
            boardElement.appendChild(cell);
        }
    }
}

// 7. Gravity(落下処理)
// 通常速度
let dropSpeed = 1000;  
let dropInterval;

// ゲームオーバー判定
let gameOver = false;

function startGravity() {
    // 速度変更のためにIDを保存
    dropInterval = setInterval(() => {

     // ゲームオーバーになったら
    if (gameOver) return;

    // 下に空きがあるかつ、一番下でない場合yを+1して下に移動させる
    if (canMoveDown()) {
        currentPiece.y++;

    // 下に動けない場合
    } else {
        // 落下ブロックを固定化
        fixPiece();
        // 新しいブロックを生成して、落下開始
        spawnPiece();
    }

    // 処理が1秒ごとに実行される
    render();
    },dropSpeed);
}


// 実行
startGravity()


