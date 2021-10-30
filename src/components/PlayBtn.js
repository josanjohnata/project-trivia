import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayBtn extends Component {
  render() {
    const { func } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-play"
        id="play-btn"
        onClick={ func }
        className="btn-neon-red"
      >
        Play
      </button>
    );
  }
}

export default PlayBtn;

PlayBtn.propTypes = {
  func: PropTypes.func,
};

PlayBtn.defaultProps = {
  func: {},
};
