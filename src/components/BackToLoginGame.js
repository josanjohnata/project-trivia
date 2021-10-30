import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BackToLoginGame extends Component {
  render() {
    return (
      <div className="loadind-div">
        <p className="about-description">
          If you've been viewing this screen for more than 5 seconds,
          we didn't find any questions with the settings you chose!
          <br />
          If you've been viewing this screen for more than 5 seconds, we haven't found any questions with the settings you've chosen!
        </p>
        <Link to="/" style={ { textDecoration: 'none' } }>
          <div className="setup-back-home">
            <button
              type="button"
              data-testid="btn-go-home"
              className="btn-neon-blue back-home"
            >
              Back to login
            </button>
          </div>
        </Link>
      </div>
    );
  }
}

export default BackToLoginGame;
