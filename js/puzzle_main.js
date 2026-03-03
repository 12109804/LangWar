// データ構造 12×6マス
    // 行（縦）
const ROWS = 12; 
    // 列（横）
const COLS = 7;

// 配列をつくる
let board = Array.from({length: ROWS }, () =>
    // 各行に長さ〇の配列をつくる（中身はすべて０）
    Array(COLS).fill(0)
);

// 描画
function render() {
    // 画面先のHTMLの要素を取得
    const boardElement = document.getElementById("board");

    // グリッドレイアウト有効
    boardElement.style.display = "grid";
    // 列の数を表示、各列の幅固定
    boardElement.style.gridTemplateColumns = `repeat(${COLS}, 40px)`;
    // 描画（画面のリセット）
    boardElement.innerHTML = "";

    // 2重ループ（行から列
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 毎回新しいマスをメモリ上に作成し、クラスを適応させる
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // 値が0以外の場合、クラスを適応
            // 固定ブロック
            if (board[row][col] !== 0) {
                cell.classList.add("filled");
            }
            // 落下ブロック描画
            if (
                row === currentPiece.y && 
                col === currentPiece.x
            ){
                cell.classList.add("current");
            }
            // 作成されたマスをboardの中、末尾から順に追加
            boardElement.appendChild(cell);
        }
    }
}


// 落下ブロック
let currentPiece = {
    x: 3,
    y: 0,
    shape: [[1]]
};

// 新しいブロック
function spawnPiece() {
    currentPiece = {
        x: 3,
        y: 0,
        shape: [[1]]
    };
// 新しいブロックを置けない場合の処理（すでに固定ブロックがある場合）
    if (board[currentPiece.y][currentPiece.x] !== 0) {
        gameOver = true;
        // ゲームオーバーアラート
        alert("GAME OVER");
    }
}

// 落下ブロックの挙動
function canMoveDown() {
    // 一番下なら止まる
    if (currentPiece.y >= ROWS - 1) {
        return false;
    }
    // 落下ブロックの下に固定ブロックがある場合止まる
    if (board[currentPiece.y + 1][currentPiece.x] !== 0) {
        return false;
    }
    return true;
}

// 重力
setInterval(() => {
    // ゲームオーバーになったら
    if (gameOver) return;
    // 下に空きがあるかつ、一番下でない場合yを+1して下に移動させる
    if (canMoveDown()) {
        currentPiece.y++;
    // 下に動けない場合
    } else {
        // 落下ブロックを固定化
        fixPice();
        // 新しいブロックを生成して、落下開始
        spawnPiece();
    }

    // 処理が1秒ごとに実行される
    render()
}, 1000);

// 固定処理
function fixPice() {
    board[currentPiece.y][currentPiece.x] = 1;
}

// ゲームオーバー判定
let gameOver = false;