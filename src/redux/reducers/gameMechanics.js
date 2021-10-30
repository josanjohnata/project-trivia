import {
  DECREASE_TIME_TO_RESPOND,
  INITIATE_TIMER,
  STOP_N_RESET_TIMER_FUNCTION,
  MODIFY_TIMER,
  MODIFY_NEXT_BTN,
  ALLOW_QUESTIONS_BTN_AFTER_NEXT_CLICK,
  SEND_CONFIG_OPTIONS,
} from '../actions/index';

const INITIAL_STATE = {
  timeToRespond: 30,
  timerRunning: true,
  showNextBtn: false,
  categoryValue: '',
  answearType: '',
  dificulty: '',
};

function gameMechanics(state = INITIAL_STATE, action) {
  switch (action.type) {
  case INITIATE_TIMER:
    return {
      ...state,
      timeToRespond: action.startTimer,
    };

  case DECREASE_TIME_TO_RESPOND:
    return {
      ...state,
      timeToRespond: action.time,
    };

  case STOP_N_RESET_TIMER_FUNCTION:
    return {
      ...state,
      stopTimerFunc: action.stop,
      resetTimerFunc: action.reset,
    };

  case MODIFY_TIMER:
    return {
      ...state,
      timerRunning: action.boolean,
    };
  case MODIFY_NEXT_BTN:
    return {
      ...state,
      showNextBtn: action.boolean,
    };
  case ALLOW_QUESTIONS_BTN_AFTER_NEXT_CLICK:
    return {
      ...state,
      allowQuestionsBtns: action.func,
    };
  case SEND_CONFIG_OPTIONS:
    return {
      ...state,
      categoryValue: action.category,
      answearType: action.answear,
      dificulty: action.dificulty,
    };

  default:
    return state;
  }
}

export default gameMechanics;
