const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
const QUESTION_ENDPOINT = 'https://opentdb.com/api.php?amount=5';

async function getToken() {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data.token;
  } catch (error) {
    return error;
  }
}

async function getQuestions(receiveToken, category, answear, difficulty) {
  let URL = '';

  if (category && answear && difficulty) {
    URL = `&category=${Number(category)}&difficulty=${difficulty}&type=${answear}&token=`;
  } else if (category) {
    URL = `&category=${Number(category)}&token=`;
  } else if (difficulty) {
    URL = `&difficulty=${difficulty}&token=`;
  } else if (answear) {
    URL = `&type=${answear}&token=`;
  } else {
    URL = '&token=';
  }

  try {
    const response = await fetch(`${QUESTION_ENDPOINT}${URL}${receiveToken}`);
    const questions = await response.json();
    return questions.results;
  } catch (error) {
    return error;
  }
}

export {
  getToken,
  getQuestions,
};
