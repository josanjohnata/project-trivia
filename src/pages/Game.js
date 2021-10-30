import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Questions from '../components/Questions';
import { questionIdIncrease, modifyTimer, InitiateTimer, modifyNextBtn,
  addQuestionsPlayed, resetTriviaQuestionsIdAndPlayedQuestions,
  sendQuestions, recoverNameAndEmailFromRefresh,
  sendConfigOptionsAction, modifyPlayingTruOrFalse,
} from '../redux/actions';
import { getQuestions } from '../services/TriviaApi';
import '../App.css';
import Header from '../components/Header';
import { FormatQuestions, FormatCorrectQuestion,
  FormatIncorrectQuestions } from '../helpers/FormatQuestions';
import Loading from '../components/Loading';
import { playProxima, stopCertaErrouSound } from '../components/SoundControl';
import { randomizeCorrectQuestion } from '../helpers/FunctionsHelpers';

const TRINTA = 30;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToFeedBack: false,
      componentMounted: false,
    };
    this.handleClickNextBtn = this.handleClickNextBtn.bind(this);
    this.resetQuestionsBorderColor = this.resetQuestionsBorderColor.bind(this);
    this.getQuestionList = this.getQuestionList.bind(this);
    this.checkApiResponseValidity = this.checkApiResponseValidity.bind(this);
  }

  componentDidMount() {
    const { sendRecoveredPlayerInfo,
      sendRecoveredGameConfigToStore } = this.props;
    const {
      name,
      gravatarEmail,
      photo: img,
      categoryConfig: category,
      answearConfig: answear,
      dificultyConfig: dificulty,
    } = JSON.parse(localStorage.state).player;
    const photo = img;
    sendRecoveredGameConfigToStore(category, answear, dificulty);
    sendRecoveredPlayerInfo(name, gravatarEmail, photo);
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
        photo: img,
        categoryConfig: category,
        answearConfig: answear,
        dificultyConfig: dificulty,
      },
    };
    const time = 700;
    localStorage.state = JSON.stringify(player);
    setTimeout(() => {
      this.getQuestionList();
    }, time);
  }

  async getQuestionList() {
    const {
      token,
      sendQuestionList,
      getCategoryConfigFromStore: category,
      getAnswearConfigFromStore: answear,
      getDifficultyConfigFromStore: difficulty,
    } = this.props;
    const receiveQuestions = await getQuestions(token, category, answear, difficulty);

    const questionList = [];
    receiveQuestions.forEach((item) => {
      questionList.push(item);
    });

    const incorrectList = [];
    receiveQuestions.forEach((item) => {
      incorrectList.push(item.incorrect_answers);
    });

    const correctList = [];
    receiveQuestions.forEach((item) => {
      correctList.push(item.correct_answer);
    });

    const questions = FormatQuestions(questionList);
    const incorrectQuestions = FormatIncorrectQuestions(incorrectList);
    const correctQuestions = FormatCorrectQuestion(correctList);

    sendQuestionList(questions, incorrectQuestions, correctQuestions);
    this.setState({
      componentMounted: true,
    });
  }

  checkApiResponseValidity() {
    const { questionListLength } = this.props;
    const timeOut = 1000;
    setTimeout(() => {
      if (questionListLength.length > 0) {
        const { playingTrue } = this.props;
        playingTrue(true);
      }
    }, timeOut);
  }

  handleClickNextBtn() {
    const {
      increaseId, idTrivia, AddTimeToTimer, resetTimer,
      showNextBtn, allowQuestionsBtn,
      totalQuestions, resetQuestionsId, increasePlayedQuestions,
      soundTrue,
    } = this.props;
    randomizeCorrectQuestion();
    showNextBtn(false);
    increaseId(idTrivia + 1);
    allowQuestionsBtn();
    increasePlayedQuestions();
    AddTimeToTimer(TRINTA);
    resetTimer();
    this.resetQuestionsBorderColor();
    const questionNumber = 5;
    stopCertaErrouSound();
    if (soundTrue && totalQuestions < questionNumber) playProxima();
    if (totalQuestions === questionNumber) {
      resetQuestionsId();
      return (
        this.setState({
          redirectToFeedBack: true,
        })
      );
    }
  }

  resetQuestionsBorderColor() {
    const wrong = document.querySelectorAll('#incorrect-answear');
    const correct = document.querySelector('#correct-answear');
    wrong.forEach((element) => {
      element.style.border = '';
    });
    correct.style.border = '';
  }

  render() {
    const { redirectToFeedBack, componentMounted } = this.state;
    const { playing } = this.props;
    if (redirectToFeedBack) return <Redirect to="/feedback" />;
    return (
      <>
        {this.checkApiResponseValidity()}
        <Header />
        <div className="game-container">
          {
            playing && componentMounted ? <Questions
              func={ this.handleClickNextBtn }
            /> : <Loading />
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  idTrivia: state.questions.idTrivia,
  resetTimer: state.gameMechanics.resetTimerFunc,
  stopTimerfunc: state.gameMechanics.stopTimerFunc,
  allowQuestionsBtn: state.gameMechanics.allowQuestionsBtns,
  runningTimer: state.gameMechanics.timerRunning,
  totalQuestions: state.player.questionsPlayed,
  token: state.player.token,
  getCategoryConfigFromStore: state.gameMechanics.categoryValue,
  getAnswearConfigFromStore: state.gameMechanics.answearType,
  getDifficultyConfigFromStore: state.gameMechanics.dificulty,
  playing: state.questions.playing,
  questionListLength: state.questions.questions,
  soundTrue: state.questions.playSound,
});

const mapDispatchToProps = (dispatch) => ({
  increaseId: (increase) => dispatch(questionIdIncrease(increase)),
  timerBoolean: (boolean) => dispatch(modifyTimer(boolean)),
  AddTimeToTimer: (startTimer) => dispatch(InitiateTimer(startTimer)),
  showNextBtn: (boolean) => dispatch(modifyNextBtn(boolean)),
  increasePlayedQuestions: () => dispatch(addQuestionsPlayed()),
  resetQuestionsId: () => (dispatch(resetTriviaQuestionsIdAndPlayedQuestions())),
  sendQuestionList: (quest, inc, corre) => dispatch(sendQuestions(quest, inc, corre)),
  sendRecoveredPlayerInfo: (name, email, img) => (
    dispatch(recoverNameAndEmailFromRefresh(name, email, img))),
  sendRecoveredGameConfigToStore: (category, answear, dificulty) => (
    dispatch(sendConfigOptionsAction(category, answear, dificulty))),
  playingTrue: (bool) => dispatch(modifyPlayingTruOrFalse(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  idTrivia: PropTypes.number,
  increaseId: PropTypes.func.isRequired,
  AddTimeToTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  showNextBtn: PropTypes.func,
  allowQuestionsBtn: PropTypes.func,
  totalQuestions: PropTypes.number.isRequired,
  resetQuestionsId: PropTypes.func,
  sendQuestionList: PropTypes.func,
  token: PropTypes.string.isRequired,
  sendRecoveredPlayerInfo: PropTypes.func,
  increasePlayedQuestions: PropTypes.func,
  sendRecoveredGameConfigToStore: PropTypes.func,
  getCategoryConfigFromStore: PropTypes.string.isRequired,
  getAnswearConfigFromStore: PropTypes.string.isRequired,
  getDifficultyConfigFromStore: PropTypes.string.isRequired,
  playingTrue: PropTypes.func,
  playing: PropTypes.bool,
  questionListLength: PropTypes.arrayOf(Array).isRequired,
  soundTrue: PropTypes.bool.isRequired,
};

Game.defaultProps = {
  idTrivia: 0,
  AddTimeToTimer: PropTypes.func,
  resetTimer: PropTypes.func,
  showNextBtn: PropTypes.func,
  allowQuestionsBtn: PropTypes.func,
  resetQuestionsId: PropTypes.func,
  sendQuestionList: PropTypes.func,
  sendRecoveredPlayerInfo: PropTypes.func,
  increasePlayedQuestions: PropTypes.func,
  sendRecoveredGameConfigToStore: PropTypes.func,
  playingTrue: PropTypes.func,
  playing: false,
};
