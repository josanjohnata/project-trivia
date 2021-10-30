import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';
import BtnSetupScreen from '../components/btnSetupScreen';
import fetchGravatar from '../services/GravatarApi';
import { sendGravatarSrcImg, sendQuestions, resetStoreScores, modifyPlayingTruOrFalse,
} from '../redux/actions/index';
import InputName from '../components/InputName';
import InputEmail from '../components/InputEmail';
import PlayBtn from '../components/PlayBtn';
import about from '../images/about.png';
import { getToken } from '../services/TriviaApi';
import { playMain, stopMain } from '../components/SoundControl';
import '../App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEmail: '',
      showImg: false,
      token: '',
      redirect: false,
      redirectToAbout: false,
    };
    this.handleOnChangeInputValidate = this.handleOnChangeInputValidate.bind(this);
    this.playHandle = this.playHandle.bind(this);
    this.showProfileImg = this.showProfileImg.bind(this);
    this.localStorageSave = this.localStorageSave.bind(this);
    this.receiveToken = this.receiveToken.bind(this);
    this.resetStoreInfos = this.resetStoreInfos.bind(this);
    this.aboutBtn = this.aboutBtn.bind(this);
    this.aboutBtnClickHandler = this.aboutBtnClickHandler.bind(this);
  }

  componentDidMount() {
    const { soundTrue } = this.props;
    if (soundTrue) playMain();
    this.receiveToken();
    this.resetStoreInfos();
    const button = document.querySelector('#play-btn');
    button.disabled = true;
  }

  async receiveToken() {
    const response = await getToken();
    this.setState({
      token: response,
    });
  }

  resetStoreInfos() {
    const { resetStorePoints } = this.props;
    const ZERO = 0;
    resetStorePoints(ZERO, ZERO);
  }

  handleOnChangeInputValidate(e) {
    const name = document.querySelector('#inputName');
    const button = document.querySelector('#play-btn');
    const email = document.querySelector('#inputEmail');

    if (email.checkValidity() && email.value.length >= 1 && name.value.length >= 1) {
      button.disabled = false;
    } else if (
      !email.checkValidity()
      || name.value.length < 1
      || email.value.length < 1) {
      button.disabled = true;
    }
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  async playHandle() {
    const { inputEmail, inputName, token } = this.state;
    const { sendImgSrc, playingfalse } = this.props;

    const hash = md5(inputEmail).toString();
    await fetchGravatar(hash);
    this.setState({
      showImg: true,
      imgHash: hash,
    });
    const src = `https://www.gravatar.com/avatar/${hash}.jpg`;
    sendImgSrc(inputName, src, inputEmail, token);
    this.localStorageSave();
    this.setState({
      redirect: true,
    });
    stopMain();
    playingfalse(false);
  }

  localStorageSave() {
    const { token } = this.state;
    const { score,
      assertions,
      playerName,
      playerEmail,
      playerPhoto,
      getCategoryConfigFromStore, getAnswearConfigFromStore, getDificultyConfigFromStore,
    } = this.props;
    const player = {
      player: {
        name: playerName,
        assertions,
        score,
        gravatarEmail: playerEmail,
        photo: playerPhoto,
        categoryConfig: getCategoryConfigFromStore,
        answearConfig: getAnswearConfigFromStore,
        dificultyConfig: getDificultyConfigFromStore,
      },
    };
    localStorage.state = JSON.stringify(player);
    localStorage.token = JSON.stringify(token);
  }

  showProfileImg() {
    const { imgHash } = this.state;
    return (
      <img alt="profile img" src={ `https://www.gravatar.com/avatar/${imgHash}.jpg` } />
    );
  }

  aboutBtn() {
    return (
      <div className="div-btn-about">
        <button
          type="button"
          className="btn-neon-red btn-about"
          onClick={ this.aboutBtnClickHandler }
        >
          About
        </button>
        <div className="div-btn-img-about">
          <img src={ about } alt="sobre" className="btn-about-img" />
        </div>
      </div>
    );
  }

  aboutBtnClickHandler() {
    this.setState({
      redirectToAbout: true,
    });
  }

  render() {
    const { showImg, redirect, redirectToAbout } = this.state;

    if (redirect) return <Redirect to="/game" />;
    if (redirectToAbout) return <Redirect to="/about" />;

    return (
      <div>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <section className="login-container">
            <form className="login-form neon-border-purple">
              <InputName func={ this.handleOnChangeInputValidate } />
              <InputEmail func={ this.handleOnChangeInputValidate } />
              <PlayBtn func={ this.playHandle } />
            </form>
            <BtnSetupScreen />
            <this.aboutBtn />
            { showImg ? this.showProfileImg() : '' }
          </section>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerToken: state.player.token,
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  assertions: state.player.assertions,
  score: state.player.score,
  playerPhoto: state.player.srcGravatarImg,
  getCategoryConfigFromStore: state.gameMechanics.categoryValue,
  getAnswearConfigFromStore: state.gameMechanics.answearType,
  getDificultyConfigFromStore: state.gameMechanics.dificulty,
  soundTrue: state.questions.playSound,
});

const mapDispatchToProps = (dispatch) => ({
  sendImgSrc: (inputName, src, inputEmail, token) => (
    dispatch(sendGravatarSrcImg(inputName, src, inputEmail, token))),
  sendQuestionList: (questionList) => dispatch(sendQuestions(questionList)),
  resetStorePoints: (score, assertions) => dispatch(resetStoreScores(score, assertions)),
  playingfalse: (bool) => dispatch(modifyPlayingTruOrFalse(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  sendImgSrc: PropTypes.func,
  resetStorePoints: PropTypes.func,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  playerPhoto: PropTypes.string.isRequired,
  getCategoryConfigFromStore: PropTypes.string.isRequired,
  getAnswearConfigFromStore: PropTypes.string.isRequired,
  getDificultyConfigFromStore: PropTypes.string.isRequired,
  soundTrue: PropTypes.bool.isRequired,
  playingfalse: PropTypes.func,
};
// -
Login.defaultProps = {
  sendImgSrc: {},
  resetStorePoints: PropTypes.func,
  playingfalse: PropTypes.func,
};
