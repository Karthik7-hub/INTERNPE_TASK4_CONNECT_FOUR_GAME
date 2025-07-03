const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];
let gameOver = false;
let score1 = 0, score2 = 0;

const game = document.getElementById('game');
const winnerDisplay = document.getElementById('winner');

function createBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    game.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => placeDisc(col));
            game.appendChild(cell);
        }
    }
    gameOver = false;
    winnerDisplay.innerText = 'Winner: --';
}

function placeDisc(col) {
    if (gameOver) return;

    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            const disc = document.createElement('div');
            disc.classList.add('disc', currentPlayer);
            cell.appendChild(disc);

            if (checkWin(row, col)) {
                handleWin(currentPlayer);
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            return;
        }
    }
}

function checkWin(row, col) {
    const directions = [
        [[0, 1], [0, -1]],
        [[1, 0], [-1, 0]],
        [[1, 1], [-1, -1]],
        [[1, -1], [-1, 1]]
    ];

    for (const [dir1, dir2] of directions) {
        let count = 1;
        count += countDirection(row, col, dir1[0], dir1[1]);
        count += countDirection(row, col, dir2[0], dir2[1]);
        if (count >= 4) return true;
    }
    return false;
}

function countDirection(row, col, dx, dy) {
    let count = 0;
    let r = row + dx;
    let c = col + dy;
    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += dx;
        c += dy;
    }
    return count;
}

function handleWin(color) {
    gameOver = true;
    const text = color === 'red' ? 'Player 🔴' : 'Player 🟡';
    winnerDisplay.innerText = `Winner: ${text}`;

    if (color === 'red') {
        score1++;
        document.getElementById('score1').innerText = score1;
    } else {
        score2++;
        document.getElementById('score2').innerText = score2;
    }
}

document.getElementById('restart').addEventListener('click', createBoard);
document.getElementById('reset-scores').addEventListener('click', () => {
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').innerText = score1;
    document.getElementById('score2').innerText = score2;
    createBoard();
});

createBoard();
