const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  const winPattern = checkWinner();
  if (winPattern) {
    statusText.textContent = `🏆 Player ${currentPlayer} Wins!`;
    highlightWin(winPattern);
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.textContent = "😮 Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const patterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let pattern of patterns) {
    const [a,b,c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return pattern;
    }
  }
  return null;
}

function highlightWin(pattern) {
  const cellDivs = document.querySelectorAll(".cell");
  pattern.forEach(i => {
    cellDivs[i].classList.add("win");
  });
}

function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  createBoard();
}

createBoard();