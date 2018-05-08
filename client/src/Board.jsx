import React from 'react';

import BoardRow from './BoardRow';
import BoardPlayer from './BoardPlayer';
import BoardWinner from './BoardWinner';

import { checkRow, createBoardMatrix, checkColumn, checkDiagonals } from './BoardLogic';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      player1: this.props.player1,
      player2: this.props.player2,
      player1turn: true,
      winner: false,
      coinsPlaced: 0,
    };

    this.handleColumnClick = this.handleColumnClick.bind(this);
    this.placeCoin = this.placeCoin.bind(this);
    this.checkBoard = this.checkBoard.bind(this);
  }

  componentWillMount() {
    const newBoard = createBoardMatrix();
    this.setState({ board: newBoard });
  }

  handleColumnClick(columnIndex) {
    if (this.state.board[0][columnIndex].coin === false && !this.state.winner) {
      this.placeCoin(Number(columnIndex), 0);
    }
  }

  placeCoin(column, row) {
    const playerNumber = this.state.player1turn ? 1 : 2;
    const currentBoard = this.state.board.slice();

    if (currentBoard[row][column].coin === false) {
      currentBoard[row][column].coin = playerNumber;
    }

    this.setState({ board: currentBoard });

    setTimeout(() => {
      if (this.state.board[row + 1] && this.state.board[row + 1][column].coin === false) {
        currentBoard[row][column].coin = false;
        this.setState({ board: currentBoard });
        this.placeCoin(column, row + 1);
      } else {
        const coinsPlaced = this.state.coinsPlaced + 1;
        this.setState({ coinsPlaced });
        this.checkBoard(row, column);
        const playerTurn = !this.state.player1turn;
        this.setState({ player1turn: playerTurn });
      }
    }, 50);
  }

  checkBoard(row, column) {
    const rowWin = checkRow(this.state.board[row]);
    const columnWin = checkColumn(this.state.board, column);
    const diagonalWin = checkDiagonals(this.state.board, row, column);
    const winner = rowWin || columnWin || diagonalWin;
    if (winner) {
      this.setState({ winner });
    } else if (this.state.coinsPlaced === 42) {
      this.setState({ winner: 'tie' });
    }
  }

  render() {
    const rows = this.state.board.map((row, rowIndex) =>
      (<BoardRow
        key={rowIndex.toString()}
        rowIndex={rowIndex}
        rowValues={row}
      />));

    const dropCoinButtons = [0, 1, 2, 3, 4, 5, 6].map(column => (
      <th key={column}>
        <button value={column} onClick={() => this.handleColumnClick(column)} id="dropCoin"><img src="arrow.png" alt="arrow" /></button>
      </th>));

    const boardplayer = (
      <div>
        <BoardPlayer
          player1turn={this.state.player1turn}
          player1={this.state.player1}
          player2={this.state.player2}
        />
        <table className="Board">
          <tbody>
            <tr>
              {dropCoinButtons}
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );

    const boardWinner = (<BoardWinner
      winnerID={this.state.winner}
      player1={this.state.player1}
      player2={this.state.player2}
      rows={rows}
    />);

    const view = this.state.winner ? boardWinner : boardplayer;

    return (
      <div className="BoardPage">
        { view }
      </div>
    );
  }
}

export default Board;
