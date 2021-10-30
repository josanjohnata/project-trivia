import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class QuestionPainel extends Component {
  render() {
    const { triviaQuestions, idTrivia, questionNumber } = this.props;
    const { difficulty } = triviaQuestions[idTrivia];
    return (
      <div className="question-panel">
        <span>
          {`Questão: ${Number(questionNumber)}/5 | `}
        </span>
        <span>
          {`Dificulty: 
          ${difficulty}`}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  triviaQuestions: state.questions.questions,
  idTrivia: state.questions.idTrivia,
  questionNumber: state.player.questionsPlayed,
});

export default connect(mapStateToProps)(QuestionPainel);

QuestionPainel.propTypes = ({
  triviaQuestions: PropTypes.arrayOf(Object),
  idTrivia: PropTypes.number,
  questionNumber: PropTypes.number,
});

QuestionPainel.defaultProps = {
  idTrivia: 0,
  triviaQuestions: [],
  questionNumber: 1,
};
