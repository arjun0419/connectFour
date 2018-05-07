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
    this.placeCoin(Number(columnIndex), 0);
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
    }
  }

  render() {
    const rows = this.state.board.map(row =>
      <BoardRow rowValues={row} handleColumnClick={this.handleColumnClick} />);

    const boardplayer = (
      <div>
        <BoardPlayer
          player1turn={this.state.player1turn}
          player1={this.state.player1}
          player2={this.state.player2}
        />
        <table className="Board">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );

    const boardWinner = (<BoardWinner
      winnerID={this.state.winner}
      player1={this.state.player1}
      player2={this.state.player2}
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
