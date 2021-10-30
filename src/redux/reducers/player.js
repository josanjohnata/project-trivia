import {
  SEND_GRAVATAR_SRC_IMG,
  INCREASE_PLAYER_SCORE,
  ADD_QUESTIONS_PLAYED,
  RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS,
  RESET_STORE_SCORES,
  RECOVER_NAME_AND_EMAIL_FROM_REFRESH,

} from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  srcGravatarImg: '',
  token: '',
  questionsPlayed: 1,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_GRAVATAR_SRC_IMG:
    return {
      ...state,
      srcGravatarImg: action.src,
      name: action.name,
      gravatarEmail: action.email,
      token: action.token,
    };
  case INCREASE_PLAYER_SCORE:
    return {
      ...state,
      score: state.score + action.increase,
      assertions: action.assertions,
    };
  case ADD_QUESTIONS_PLAYED:
    return {
      ...state,
      questionsPlayed: state.questionsPlayed + 1,
    };
  case RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS:
    return {
      ...state,
      questionsPlayed: 1,
    };
  case RESET_STORE_SCORES:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  case RECOVER_NAME_AND_EMAIL_FROM_REFRESH:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
      srcGravatarImg: action.img,
    };

  default:
    return state;
  }
}

export default player;
