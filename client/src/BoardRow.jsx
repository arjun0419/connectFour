import React from 'react';

import BoardSlot from './BoardSlot';

const Row = ({ rowIndex, rowValues }) => {
  const slots = rowValues.map((slot, index) => {
    const id = `${rowIndex}${index}`;
    return (<BoardSlot
      key={id}
      slot={slot}
      column={index}
    />);
  });

  return (<tr id="slotRow" key={rowIndex.toString()}>{slots}</tr>);
};

export default Row;
