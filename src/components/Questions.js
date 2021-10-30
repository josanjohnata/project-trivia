import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Timer from './Timer';
import { increasePlayerScore, modifyNextBtn,
  allowQuestionsBtnAfterNextClick, modifyTimer, addQuestionsPlayed,
} from '../redux/actions';
import quot1 from '../images/quots_2.png';
import quot2 from '../images/quots_1.png';
import {
  changeBorderColor,
  disableBtnsAfterTimer,
  allowAbleBtnsAfterNextClick,
  randomizeCorrectQuestion } from '../helpers/FunctionsHelpers';
import { playProxima, playCerta, playErrou } from './SoundControl';
import QuestionPainel from './QuestionPainel';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.generateQuestionsBtnFunc = this.generateQuestionsBtnFunc.bind(this);
    this.manageCorrectAnswear = this.manageCorrectAnswear.bind(this);
    this.localStorageNewSave = this.localStorageNewSave.bind(this);
  }

  componentDidMount() {
    randomizeCorrectQuestion();
    const { sendAbleQuestBtnFunc, soundTrue } = this.props;
    if (soundTrue) playProxima();
    sendAbleQuestBtnFunc(allowAbleBtnsAfterNextClick);
  }

  manageCorrectAnswear() {
    const { addPoint, globalTimer, assertions, showNextBtn,
      stopTimer, soundTrue } = this.props;
    stopTimer();
    const DEZ = 10;
    const point = DEZ + (globalTimer * this.multiplier);
    this.localStorageNewSave(point, assertions);
    addPoint(point, (assertions + 1));
    showNextBtn(true);
    disableBtnsAfterTimer();
    if (soundTrue) playCerta();
  }

  validateScore(e) {
    const {
      triviaQuestions, idTrivia: id,
      showNextBtn, stopTimer, soundTrue,
    } = this.props;
    const { difficulty } = triviaQuestions[id];
    this.multiplier = 0;

    switch (difficulty) {
    case 'easy':
      this.multiplier = 1;
      break;

    case 'medium':
      this.multiplier = 2;
      break;

    case 'hard':
      this.multiplier = 3;
      break;

    default:
      break;
    }
    if (e.target.id === 'correct-answear') {
      this.manageCorrectAnswear();
    } else if (e.target.id === 'incorrect-answear') {
      if (soundTrue) playErrou();
      disableBtnsAfterTimer();
      stopTimer();
      showNextBtn(true);
    }
  }

  localStorageNewSave(point, assertions) {
    const {
      playerName,
      playerEmail,
      getCategoryConfigFromStore,
      getAnswearConfigFromStore, getDificultyConfigFromStore } = this.props;
    const previousScore = JSON.parse(localStorage.state).player.score;
    const picture = JSON.parse(localStorage.state).player.photo;
    const player = {
      player: {
        name: playerName,
        assertions: assertions + 1,
        score: previousScore + point,
        gravatarEmail: playerEmail,
        photo: picture,
        categoryConfig: getCategoryConfigFromStore,
        answearConfig: getAnswearConfigFromStore,
        dificultyConfig: getDificultyConfigFromStore,
      },
    };
    localStorage.state = JSON.stringify(player);
  }

  generateQuestionsBtnFunc() {
    const { incorrectQuest, correctAnswears,
      idTrivia: id } = this.props;
    return (
      <div className="option-container">
        { incorrectQuest[id].map((item, index) => (
          <button
            id="incorrect-answear"
            type="button"
            key={ `wrong-answer-${index}` }
            className="inputNeon-purple"
            data-testid={ `wrong-answer-${index}` }
            onClick={ (e) => { changeBorderColor(); this.validateScore(e); } }
          >
            { item }
          </button>
        )) }
        <button
          type="button"
          id="correct-answear"
          className="inputNeon-purple correct-question"
          data-testid="correct-answer"
          onClick={ (e) => { changeBorderColor(); this.validateScore(e); } }
        >
          { correctAnswears[id] }
        </button>
      </div>
    );
  }

  render() {
    const {
      triviaQuestions, idTrivia: id, func, globalTimer, shouldShowNextBtn,
      showNextBtn,
    } = this.props;
    const { category, question } = triviaQuestions[id];
    if (globalTimer <= 0) {
      disableBtnsAfterTimer();
      changeBorderColor();
      showNextBtn(true);
    }

    return (
      <>
        <Timer />
        <div className="question-container">
          <div className="neon-border-question">
            <img alt="" src={ quot1 } className="quot-1" />
            <div className="question-div">
              <QuestionPainel />
              <h4 data-testid="question-category" className="questions-cat">
                Category:
                { category }
              </h4>
              <h3 data-testid="question-text" className="questions-text">{ question }</h3>
            </div>
            <img alt="" src={ quot2 } className="quot-2" />
          </div>
          <div>
            { this.generateQuestionsBtnFunc() }
            {
              shouldShowNextBtn ? (
                <button
                  type="button"
                  onClick={ func }
                  className="btn-neon-red btn-next"
                  data-testid="btn-next"
                >
                  Next
                </button>) : ''
            }
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuestions: state.questions.questions,
  incorrectQuest: state.questions.incorrectAnswears,
  correctAnswears: state.questions.correctAnswears,
  idTrivia: state.questions.idTrivia,
  runningTimer: state.gameMechanics.timerRunning,
  globalTimer: state.gameMechanics.timeToRespond,
  stopTimer: state.gameMechanics.stopTimerFunc,
  shouldShowNextBtn: state.gameMechanics.showNextBtn,
  score: state.player.score,
  assertions: state.player.assertions,
  playerName: state.player.name,
  playerEmail: state.player.gravatarEmail,
  getCategoryConfigFromStore: state.gameMechanics.categoryValue,
  getAnswearConfigFromStore: state.gameMechanics.answearType,
  getDificultyConfigFromStore: state.gameMechanics.dificulty,
  soundTrue: state.questions.playSound,
});

const mapDispatchToProps = (dispatch) => ({
  addPoint: (point, assertions) => dispatch(increasePlayerScore(point, assertions)),
  showNextBtn: (boolean) => dispatch(modifyNextBtn(boolean)),
  sendAbleQuestBtnFunc: (func) => dispatch(allowQuestionsBtnAfterNextClick(func)),
  modifyTimerRunning: (bool) => dispatch(modifyTimer(bool)),
  increasePlayedQuestions: () => dispatch(addQuestionsPlayed()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

Questions.propTypes = ({
  triviaQuestions: PropTypes.arrayOf(Object),
  idTrivia: PropTypes.number,
  func: PropTypes.func,
  globalTimer: PropTypes.number.isRequired,
  addPoint: PropTypes.func,
  showNextBtn: PropTypes.func,
  shouldShowNextBtn: PropTypes.bool.isRequired,
  sendAbleQuestBtnFunc: PropTypes.func,
  assertions: PropTypes.number.isRequired,
  stopTimer: PropTypes.func,
  incorrectQuest: PropTypes.arrayOf(Array),
  correctAnswears: PropTypes.arrayOf(Array),
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  getCategoryConfigFromStore: PropTypes.string.isRequired,
  getAnswearConfigFromStore: PropTypes.string.isRequired,
  getDificultyConfigFromStore: PropTypes.string.isRequired,
  soundTrue: PropTypes.bool.isRequired,
});

Questions.defaultProps = {
  idTrivia: 0,
  triviaQuestions: [],
  func: {},
  addPoint: PropTypes.func,
  showNextBtn: PropTypes.func,
  sendAbleQuestBtnFunc: PropTypes.func,
  stopTimer: PropTypes.func,
  incorrectQuest: PropTypes.arrayOf(Array),
  correctAnswears: PropTypes.arrayOf(Array),
};
