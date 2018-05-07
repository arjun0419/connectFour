
module.exports.checkRow = (row) => {
  let previousCoin = null;
  let currentCoin = null;
  let coinCount = 0;
  let winner = false;

  row.forEach((slot) => {
    currentCoin = slot.coin;
    if (currentCoin === previousCoin) {
      if (currentCoin) {
        coinCount += 1;
        if (coinCount === 3) {
          winner = currentCoin;
        }
      }
    } else if (currentCoin !== previousCoin) {
      coinCount = 0;
    }
    previousCoin = currentCoin;
  });
  return winner;
};

module.exports.createBoardMatrix = () => {
  const newBoard = [];
  for (let i = 0; i < 6; i += 1) {
    const row = [];
    for (let j = 0; j < 7; j += 1) {
      row.push({
        coin: false,
      });
    }
    newBoard.push(row);
  }
  return newBoard;
};

const checkLeftoRightDiagonal = (board, row, column) => {

  const arr = [];

  let currentRow = row;
  let currentColumn = column;

  while (board[currentRow] && board[currentRow][currentColumn]) {
    arr.push(board[currentRow][currentColumn]);
    currentRow -= 1;
    currentColumn += 1;
  }

  currentRow = row + 1;
  currentColumn = column - 1;

  while (board[currentRow] && board[currentRow][currentColumn]) {
    arr.unshift(board[currentRow][currentColumn]);
    currentRow += 1;
    currentColumn -= 1;
  }

  return module.exports.checkRow(arr);
};

const checkRightToLeftDiagonal = (board, row, column) => {
  const arr = [];

  let currentRow = row;
  let currentColumn = column;

  while (board[currentRow] && board[currentRow][currentColumn]) {
    arr.push(board[currentRow][currentColumn]);
    currentRow += 1;
    currentColumn += 1;
  }

  currentRow = row - 1;
  currentColumn = column - 1;

  while (board[currentRow] && board[currentRow][currentColumn]) {
    arr.unshift(board[currentRow][currentColumn]);
    currentRow -= 1;
    currentColumn -= 1;
  }

  return module.exports.checkRow(arr);
};

module.exports.checkColumn = (board, column) => {
  const columnValues = [];
  board.forEach((row) => {
    columnValues.push(row[column]);
  });
  const winner = module.exports.checkRow(columnValues);
  return winner;
};

module.exports.checkDiagonals = (board, row, column) => {
  const wonLeftToRight = checkLeftoRightDiagonal(board, row, column);
  const wonRightToLeft = checkRightToLeftDiagonal(board, row, column);
  const winner = wonRightToLeft || wonLeftToRight;
  return winner;
};
