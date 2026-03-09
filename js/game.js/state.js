import { forEachBlock } from "./utils.js";
import {ROWS, COLS, board } from './board.js';
import { PIECES } from "./pieces.js";



/* ゲームオーバー判定 */
export let gameOver = false;  

// 現在のピース（参照を共有するため空）
export let currentPiece = {};

// 新しいピースの生成
export function spawnPiece() {
    // ピースの要素数を整数かつランダムに取得
    const randomIndex = Math.floor(Math.random() * PIECES.length);
    const piece = PIECES[randomIndex];
    // 中身を完全にクリア
    for (const key in currentPiece) {
        delete currentPiece[key];
    }
    // 新しいピースを代入（参照はそのまま）
    currentPiece.x = Math.floor(COLS / 2);
    currentPiece.y = 0;
    currentPiece.shape = piece.shape;
        
// 新しいブロックを置けない場合の処理（すでに固定ブロックがある場合）
    if (board[currentPiece.y][currentPiece.x] !== 0) {
        gameOver = true;
        // ゲームオーバーアラート
        alert("GAME OVER");
    };
}

// 落下ブロックの挙動
export function canMoveDown() {
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
export function fixPiece() {
    forEachBlock(currentPiece,(x,y) => {
        board[y][x] = 1;  /* 盤面に書き込む（１にする） */
    });
}

// 描画 render
export function render() {
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
// 通常速度 （オブジェクト化して参照を共有する）
export let dropSpeed = { value: 1000 };
export let dropInterval = null;

export function startGravity() {
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
    },dropSpeed.value);
}
