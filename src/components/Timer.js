import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  decreaseTimeToRespond, InitiateTimer, stopAndResetFunction,
} from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.stop = this.stop.bind(this);
    this.ResetTimer = this.ResetTimer.bind(this);
  }

  componentDidMount() {
    const { SendStopAndResetFunc } = this.props;
    SendStopAndResetFunc(this.stop, this.ResetTimer);
    const MIL = 1000;
    this.clock = setInterval(() => this.tick(), MIL);
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  ResetTimer() {
    const MIL = 1000;
    this.clock = setInterval(() => this.tick(), MIL);
  }

  stop() {
    clearInterval(this.clock);
  }

  tick() {
    const { sendCurrentTime, globalTime } = this.props;
    sendCurrentTime(globalTime - 1);
  }

  render() {
    const { globalTime } = this.props;
    const ZERO = 0;
    const DEZ = 10;
    const TRINTA = 30;

    if (globalTime <= ZERO) this.stop();
    if (globalTime && globalTime < TRINTA) {
      (document.querySelector('.timer-span-text').style.color = 'rgb(255, 250, 187)');
    }
    if (globalTime && globalTime <= DEZ) {
      const text = document.querySelector('.timer-span-text');
      text.style.color = 'rgb(255, 187, 187)';
    }
    return (
      <div>
        <h5 className="timer-text">
          Response time:
          <span className="timer-value neonText timer-span-text">{` ${globalTime}`}</span>
        </h5>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendCurrentTime: (time) => dispatch(decreaseTimeToRespond(time)),
  startGlobalTimer: (startTimer) => dispatch(InitiateTimer(startTimer)),
  SendStopAndResetFunc: (func, func2) => dispatch(stopAndResetFunction(func, func2)),
});

const mapStateToProps = (state) => ({
  globalTime: state.gameMechanics.timeToRespond,
  running: state.gameMechanics.timerRunning,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

Timer.propTypes = {
  sendCurrentTime: PropTypes.func,

  SendStopAndResetFunc: PropTypes.func,
  globalTime: PropTypes.number,

};

Timer.defaultProps = {
  SendStopAndResetFunc: {},
  sendCurrentTime: {},
  globalTime: 30,
};
