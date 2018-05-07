import React from 'react';

const BoardWinner = ({ winnerID, player1, player2 }) => {
  let winner = '';
  if (winnerID === 1) {
    winner = player1;
  } else if (winnerID === 2) {
    winner = player2;
  }

  return (
    <div className="winner">
      <img src="winner.png" alt="winner" />
      <h1>{winner} won the game!</h1>
      <h2> Congratulations! </h2>
      <form>
        <button>Play again?</button>
      </form>
    </div>
  );
};

export default BoardWinner;
