const SEND_GRAVATAR_SRC_IMG = 'SEND_GRAVATAR_SRC_IMG';
const SEND_QUESTIONS = 'SEND_QUESTIONS';
const DECREASE_TIME_TO_RESPOND = 'DECREASE_TIME_TO_RESPOND';
const INITIATE_TIMER = 'INITIATE_TIMER';
const STOP_N_RESET_TIMER_FUNCTION = 'STOP_TIMER_FUNCTION';
const QUESTION_ID_INCREASE = 'QUESTION_ID_INCREASE';
const MODIFY_TIMER = 'MODIFY_TIMER';
const INCREASE_PLAYER_SCORE = 'INCREASE_PLAYER_SCORE';
const MODIFY_NEXT_BTN = 'MODIFY_NEXT_BTN';
const ALLOW_QUESTIONS_BTN_AFTER_NEXT_CLICK = 'ALLOW_QUESTIONS_BTN_AFTER_NEXT_CLICK';
const ADD_QUESTIONS_PLAYED = 'ADD_QUESTIONS_PLAYED';
const RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS = (
  'RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS');
const RESET_STORE_SCORES = 'RESET_STORE_SCORES';
const RECOVER_NAME_AND_EMAIL_FROM_REFRESH = 'RECOVER_NAME_AND_EMAIL_FROM_REFRESH';
const SEND_CONFIG_OPTIONS = 'SEND_CONFIG_OPTIONS';
const MODIFY_PLAYING_TRUE_FALSE = 'MODIFY_PLAYING_TRUE_FALSE';
const MODIFY_PLAY_SOUND = 'MODIFY_PLAY_SOUND';

function sendGravatarSrcImg(name, src, email, token) {
  return {
    type: SEND_GRAVATAR_SRC_IMG,
    name,
    src,
    email,
    token,
  };
}

function sendQuestions(questions, incorrect, correct) {
  return {
    type: SEND_QUESTIONS,
    questions,
    incorrect,
    correct,
  };
}

function decreaseTimeToRespond(time) {
  return {
    type: DECREASE_TIME_TO_RESPOND,
    time,
  };
}

function InitiateTimer(startTimer) {
  return {
    type: INITIATE_TIMER,
    startTimer,
  };
}

function stopAndResetFunction(stop, reset) {
  return {
    type: STOP_N_RESET_TIMER_FUNCTION,
    stop,
    reset,
  };
}

function questionIdIncrease(increase) {
  return {
    type: QUESTION_ID_INCREASE,
    increase,
  };
}

function modifyTimer(boolean) {
  return {
    type: MODIFY_TIMER,
    boolean,
  };
}

function increasePlayerScore(increase, assertions) {
  return {
    type: INCREASE_PLAYER_SCORE,
    increase,
    assertions,
  };
}

function modifyNextBtn(boolean) {
  return {
    type: MODIFY_NEXT_BTN,
    boolean,
  };
}

function allowQuestionsBtnAfterNextClick(func) {
  return {
    type: ALLOW_QUESTIONS_BTN_AFTER_NEXT_CLICK,
    func,
  };
}

function addQuestionsPlayed(questions) {
  return {
    type: ADD_QUESTIONS_PLAYED,
    questions,
  };
}

function resetTriviaQuestionsIdAndPlayedQuestions() {
  return {
    type: RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS,
  };
}

function resetStoreScores(score, assertions) {
  return {
    type: RESET_STORE_SCORES,
    score,
    assertions,
  };
}

function recoverNameAndEmailFromRefresh(name, email, img) {
  return {
    type: RECOVER_NAME_AND_EMAIL_FROM_REFRESH,
    name,
    email,
    img,
  };
}

function sendConfigOptionsAction(category, answear, dificulty) {
  return {
    type: SEND_CONFIG_OPTIONS,
    category,
    answear,
    dificulty,
  };
}

function modifyPlayingTruOrFalse(bool) {
  return {
    type: MODIFY_PLAYING_TRUE_FALSE,
    bool,
  };
}

function modifyPlaySound(bool) {
  return {
    type: MODIFY_PLAY_SOUND,
    bool,
  };
}

export {
  SEND_GRAVATAR_SRC_IMG,
  sendGravatarSrcImg,
  SEND_QUESTIONS,
  sendQuestions,
  decreaseTimeToRespond,
  DECREASE_TIME_TO_RESPOND,
  InitiateTimer,
  INITIATE_TIMER,
  stopAndResetFunction,
  STOP_N_RESET_TIMER_FUNCTION,
  QUESTION_ID_INCREASE,
  questionIdIncrease,
  modifyTimer,
  MODIFY_TIMER,
  INCREASE_PLAYER_SCORE,
  increasePlayerScore,
  modifyNextBtn,
  MODIFY_NEXT_BTN,
  allowQuestionsBtnAfterNextClick,
  ALLOW_QUESTIONS_BTN_AFTER_NEXT_CLICK,
  ADD_QUESTIONS_PLAYED,
  addQuestionsPlayed,
  resetTriviaQuestionsIdAndPlayedQuestions,
  RESET_TRIVIA_QUESTIONSID_AND_PLAYED_QUESTIONS,
  RESET_STORE_SCORES,
  resetStoreScores,
  RECOVER_NAME_AND_EMAIL_FROM_REFRESH,
  recoverNameAndEmailFromRefresh,
  sendConfigOptionsAction,
  SEND_CONFIG_OPTIONS,
  modifyPlayingTruOrFalse,
  MODIFY_PLAYING_TRUE_FALSE,
  modifyPlaySound,
  MODIFY_PLAY_SOUND,
};
