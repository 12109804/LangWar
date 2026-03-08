import { forEachBlock } from "./utils.js";
import { ROWS, COLS, board, getCell, setCell } from "./board.js";
import { PIECES } from "./pieces.js";
import  "./control.js"; 


// 落下ブロック(最初のブロック)
let currentPiece = {
    x: 3,
    y: 0,
    shape: [[1,0],[1,0]]
};

// 落下ブロック（新しいブロック）
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

// 落下ブロックの挙動
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

// 固定処理
function fixPiece() {
    forEachBlock(currentPiece,(x,y) => {
        board[y][x] = 1;  /* 盤面に書き込む（１にする） */
    });
}

// 描画 render
function render() {
    // 画面先のHTMLの要素を取得
    const boardElement = document.getElementById("board");

    // グリッドレイアウト有効
    boardElement.style.display = "grid";
    // 列の数を表示、各列の幅固定
    boardElement.style.gridTemplateColumns = `repeat(${COLS}, 40px)`;
    // 描画（画面のリセット）
    boardElement.innerHTML = "";

    // 固定ブロックの描画、2重ループ（行から列)
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            // 毎回新しいマスをメモリ上に作成し、クラスを適応させる
            const cell = document.createElement("div");
            cell.classList.add("cell");
            // 値が0以外の場合、クラスを適応 // 固定ブロック
            if (board[row][col] !== 0) {
                cell.classList.add("filled");
                }
            boardElement.appendChild(cell);
        }
    }
    /// 落下ブロック（shape 全体）を描画
    if (currentPiece) {
        forEachBlock(currentPiece, (x,y) => {
            const index = y * COLS + x; /* １次元インデックスに変換 */
            const cell = boardElement.children[index];
            // 今描画しているマス(row,col)と一致したら current を付ける
            if (cell) {
                cell.classList.add("current");
            }
        });
    }
}

// Gravity(落下処理)
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


// 下keyを入力した瞬間だけ実行し、押しっぱなしは実行しない
let isSoftDropping = false;

// 横移動(左右移動処理)
// 左移動
function canMoveLeft() {
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
function canMoveRight() {
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


// 実行
startGravity()


