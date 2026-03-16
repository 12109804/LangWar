export const ROWS = 17;
export const COLS = 9;

// 盤面データ
export let board = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(0)
);

// 盤面をリセット
export function initBoard() {
    board = Array.from({ length: ROWS }, () =>
        Array(COLS).fill(0)
    );
}

// 盤面の値を取得
export function getCell(y, x) {
    return board[y][x];
}

// 盤面に値を書き込む
export function setCell(y, x, value) {
    board[y][x] = value;
}

// ライン消去処理
export function clearLines() {
    // 下から上にループする
    for (let row = ROWS - 1; row >= 0; row--) {
        // その行がすべて埋まっているかチェックする
        if (board[row].every(cell => cell !== 0)) {
            board.splice(row, 1);    // 行消去
            board.unshift(Array(COLS).fill(0));    // 上に新しい空行を追加
            row++;    // 同じ行をもう一度チェックする 
        }
    }
}