import {
  SEND_QUESTIONS,
  QUESTION_ID_INCREASE,
  RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS,
  MODIFY_PLAYING_TRUE_FALSE,
  MODIFY_PLAY_SOUND,

} from '../actions';

const INITIAL_STATE = {
  idTrivia: 0,
  questions: [],
  incorrectAnswears: [],
  correctAnswears: [],
  playing: false,
  playSound: false,
};

function trivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_QUESTIONS:
    return ({
      ...state,
      questions: [...action.questions],
      incorrectAnswears: action.incorrect,
      correctAnswears: action.correct,
    });
  case QUESTION_ID_INCREASE:
    return ({
      ...state,
      idTrivia: action.increase,
    });
  case RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS:
    return ({
      ...state,
      idTrivia: 0,
    });
  case MODIFY_PLAYING_TRUE_FALSE:
    return ({
      ...state,
      playing: action.bool,
    });
  case MODIFY_PLAY_SOUND:
    return ({
      ...state,
      playSound: action.bool,
    });

  default:
    return state;
  }
}

export default trivia;
