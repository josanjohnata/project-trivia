const INCORRECT = '#incorrect-answear';
const CORRECT = '#correct-answear';

function changeBorderColor() {
  const wrong = document.querySelectorAll(INCORRECT);
  const correct = document.querySelector(CORRECT);
  wrong.forEach((element) => {
    element.style.border = '3px solid rgb(255, 0, 0)';
  });
  correct.style.border = '3px solid rgb(6, 240, 15)';
}

function disableBtnsAfterTimer() {
  const wrong = document.querySelectorAll(INCORRECT);
  const correct = document.querySelector(CORRECT);
  wrong.forEach((element) => {
    element.disabled = true;
  });
  correct.disabled = true;
}

function allowAbleBtnsAfterNextClick() {
  const wrong = document.querySelectorAll(INCORRECT);
  const correct = document.querySelector(CORRECT);
  wrong.forEach((element) => {
    element.disabled = false;
  });
  correct.disabled = false;
}

function randomizeCorrectQuestion() {
  const numberOfQuestions = document.querySelectorAll('.inputNeon-purple');
  if (numberOfQuestions.length === 2) {
    const questArray = ['a', 'b'];
    const two = 2;
    const randomNumberZeroToTwo = Math.floor(Math.random() * (two));
    const question = document.querySelector('.correct-question');
    question.style.gridArea = questArray[randomNumberZeroToTwo];
    console.log('randomizei perguntas verdadeiro ou falso');
    return;
  }
  const questArray = ['a', 'b', 'c', 'd'];
  const four = 4;
  const randomNumberZeroToThree = Math.floor(Math.random() * (four));
  const question = document.querySelector('.correct-question');
  question.style.gridArea = questArray[randomNumberZeroToThree];
  console.log('randomizei perguntas multipla escolha');
}

export {
  changeBorderColor,
  disableBtnsAfterTimer,
  allowAbleBtnsAfterNextClick,
  randomizeCorrectQuestion,
};
