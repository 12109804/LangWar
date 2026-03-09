export const ROWS = 12;
export const COLS = 7;

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

// 行削除（後で実装）
export function clearLines() {
    // TODO: ライン消去処理
}