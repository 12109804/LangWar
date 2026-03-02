// データ構造 12×6マス
const ROWS = 12;
const COLS = 6;

let board = Array.from({length: ROWS }, () =>
    Array(COLS).fill(0)
);

// 描画
function render() {
    const boardElement = document.getElementById("board");

    boardElement.style.display = "grid";
    boardElement.style.gridTemplateColumns = `repeat(${COLS}, 40px)`;
    boardElement.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (board[row][col] !== 0) {
                cell.classList.add("filled");
            }

            boardElement.appendChild(cell);
        }
    }
}

render();

// 落下ブロック
let currentPiece = {
    x: 2,
    y: 0,
    shape: [[1]]
};

// 重力
setInterval(() => {
    currentPiece.y++;
},1000);

