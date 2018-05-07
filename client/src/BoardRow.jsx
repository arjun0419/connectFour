import React from 'react';
import PropTypes from 'prop-types';

import BoardSlot from './BoardSlot';

const Row = ({ rowValues, handleColumnClick }) => {
  const slots = rowValues.map((slot, index) => (
    <BoardSlot slot={slot} column={index} handleColumnClick={handleColumnClick} />
  ));

  return (<tr>{slots}</tr>);
};

export default Row;

