import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputEmail extends Component {
  render() {
    const { func } = this.props;
    return (
      <label htmlFor="inputEmail" className="inputEmail">
        <input
          type="email"
          id="inputEmail"
          data-testid="input-gravatar-email"
          onChange={ func }
          placeholder="Email"
          className="inputNeon-blue"
        />
      </label>
    );
  }
}

export default InputEmail;

InputEmail.propTypes = {
  func: PropTypes.func,
};

InputEmail.defaultProps = {
  func: {},
};
