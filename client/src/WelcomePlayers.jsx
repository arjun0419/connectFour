import React from 'react';

import Board from './Board';

class WelcomePlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startGameClicked: false,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({ startGameClicked: true });
  }

  render() {
    const player1 = this.props.player1;
    const player2 = this.props.player2;

    const welcomeView = (
      <div className="welcome">
        <h1>Welcome to the game {player1} & {player2}!</h1>
        <h3>Click below when you are ready to start! Good luck!</h3>
        <button onClick={this.handleButtonClick}>Ready!</button>
      </div>
    );

    const view = this.state.startGameClicked ? (
      <Board
        player1={player1}
        player2={player2}
      />) : welcomeView;

    return view;
  }
}

export default WelcomePlayers;
