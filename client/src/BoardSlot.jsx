import React from 'react';

const BoardSlot = ({ slot, column, handleColumnClick }) => {
  let slotToReturn = (
    <th value={column} onClick={() => handleColumnClick(column)}>
      <div id="cutOut" />
    </th>
  );

  if (slot.coin === 1) {
    slotToReturn = <th value={column} onClick={() => handleColumnClick(column)}> <div id="player1Coin" /></th>;
  } else if (slot.coin === 2) {
    slotToReturn = <th value={column} onClick={() => handleColumnClick(column)}> <div id="player2Coin" /></th>;
  }

  return slotToReturn;
};

export default BoardSlot;
