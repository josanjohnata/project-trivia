import { combineReducers } from 'redux';
import questions from './questions';
import player from './player';
import gameMechanics from './gameMechanics';

const rootReducers = combineReducers({
  questions,
  player,
  gameMechanics,
});

export default rootReducers;
