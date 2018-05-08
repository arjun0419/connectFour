import React from 'react';

const BoardWinner = ({ winnerID, player1, player2, rows }) => {
  let winner = '';
  if (winnerID === 1) {
    winner = `${player1} won the game!`;
  } else if (winnerID === 2) {
    winner = `${player2} won the game!`;
  } else if (winnerID === 'tie') {
    winner = "It's a tie!";
  }

  return (
    <div className="winner">
      <img src="winner.png" alt="winner" />
      <h1>{winner}</h1>
      <table className="Board">
        <tbody>
          {rows}
        </tbody>
      </table>
      <form>
        <button id="greenButton">Play again?</button>
      </form>

    </div>
  );
};

export default BoardWinner;
