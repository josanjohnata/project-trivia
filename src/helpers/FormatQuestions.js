function FormatCorrectQuestion(questionList) {
  const correct = questionList.map((item) => {
    item = item.replace(/&quot;/gi, '"');
    item = item.replace(/&#039;/gi, '');
    item = item.replace(/&eacute;/gi, 'é');
    item = item.replace(/&amp;/gi, '');
    item = item.replace(/&lt;/gi, '');
    item = item.replace(/&;/gi, '');
    item = item.replace(/&/gi, '');
    item = item.replace(/;/gi, '');
    return item;
  });
  return correct;
}

function FormatIncorrectQuestions(questionList) {
  const mapao = questionList.map((item) => {
    const mapinha = item.map((quest) => {
      quest = quest.replace(/&quot;/gi, '"');
      quest = quest.replace(/&#039;/gi, '');
      quest = quest.replace(/&eacute;/gi, 'é');
      quest = quest.replace(/&amp;/gi, '');
      quest = quest.replace(/&lt;/gi, '');
      quest = quest.replace(/&;/gi, '');
      quest = quest.replace(/&/gi, '');
      quest = quest.replace(/;/gi, '');
      return quest;
    });
    return mapinha;
  });
  return mapao;
}

function FormatQuestions(questionList) {
  const questions = questionList.map((item) => {
    item.question = item.question.replace(/&quot;/gi, '"');
    item.question = item.question.replace(/&#039;/gi, '');
    item.question = item.question.replace(/&eacute;/gi, 'é');
    item.question = item.question.replace(/&amp;/gi, '');
    item.question = item.question.replace(/&lt;/gi, '');
    item.question = item.question.replace(/&;/gi, '');
    item.question = item.question.replace(/&/gi, '');
    item.question = item.question.replace(/;/gi, '');
    return item;
  });
  return questions;
}

export {
  FormatQuestions,
  FormatIncorrectQuestions,
  FormatCorrectQuestion,
};
