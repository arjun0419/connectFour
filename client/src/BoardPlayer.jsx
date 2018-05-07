import React from 'react';

const BoardPlayer = ({ player1turn, player1, player2 }) => {
  const bluePlayer = (
    <div className="currentPlayer">
      <div id="playerName"> <h1>Turn: {player1}</h1> </div>
      <div id="player1Coin" />
    </div>
  );

  const redPlayer = (
    <div className="currentPlayer">
      <div id="playerName"><h1>Turn: {player2} </h1></div>
      <div id="player2Coin" />
    </div>
  );

  const currentPlayer = player1turn ? bluePlayer : redPlayer;

  return currentPlayer;
};

export default BoardPlayer;
