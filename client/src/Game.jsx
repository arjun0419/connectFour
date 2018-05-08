import React from 'react';

import WelcomePlayers from './WelcomePlayers';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: null,
      player2: null,
      submittedNames: false,
    };
    this.handleNameSubmission = this.handleNameSubmission.bind(this);
    this.handleSubmitButtonClick = this.handleSubmitButtonClick.bind(this);
  }

  handleNameSubmission(e, player) {
    this.setState({ [player]: e.target.value });
  }

  handleSubmitButtonClick() {
    this.setState({ submittedNames: true });
  }

  render() {
    const namesInvalid = this.state.player1 === this.state.player2;

    const getPlayerNames = (
      <div className="inputNames">
        <h1>Let's play Connect Four!!!</h1>
        <h3>What is your name Player 1?</h3>
        <input onChange={e => this.handleNameSubmission(e, 'player1')} />
        <h3>What is your name Player 2?</h3>
        <input onChange={e => this.handleNameSubmission(e, 'player2')} />
        <button id="greenButton" onClick={() => this.handleSubmitButtonClick()}> Submit</button>
      </div>
    );

    let gameView = getPlayerNames;

    if (!this.state.submittedNames || namesInvalid) {
      gameView = getPlayerNames;
    } else if (this.state.submittedNames && !namesInvalid) {
      gameView = <WelcomePlayers player1={this.state.player1} player2={this.state.player2} />;
    }

    return (gameView);
  }
}

export default Game;
