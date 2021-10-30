import React, { Component } from 'react';
import BackToLoginGame from './BackToLoginGame';

class Loading extends Component {
  render() {
    return (

      <div className="loading-page">
        <div className="loading-animation">
          <div className="loading">
            Loading Questions...
          </div>
          <div className="loading-circle" />
          <br />
        </div>

        <BackToLoginGame />

      </div>
    );
  }
}

export default Loading;
