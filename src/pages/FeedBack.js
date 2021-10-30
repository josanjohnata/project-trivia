import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import back from '../images/back_3.png';
import trophy from '../images/trophy_1.png';
import { modifyPlayingTruOrFalse } from '../redux/actions';
import '../App.css';

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClickRankBtn = this.handleClickRankBtn.bind(this);
    this.createRankingStorage = this.createRankingStorage.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.PlayAgainClickhandler = this.PlayAgainClickhandler.bind(this);
  }

  handleClickRankBtn() {
    this.createRankingStorage();
    const { playingfalse } = this.props;
    playingfalse(false);
  }

  createRankingStorage() {
    const { name, score, picture } = this.props;
    const userRanking = {
      name,
      score,
      picture,
    };
    if (!localStorage.ranking || localStorage.ranking.length === 0) {
      localStorage.ranking = JSON.stringify([userRanking]);
    } else {
      const localStorageRanking = JSON.parse(localStorage.ranking);
      localStorageRanking.push(userRanking);
      localStorage.ranking = JSON.stringify(localStorageRanking);
    }
  }

  PlayAgainClickhandler() {
    const { playingfalse } = this.props;
    playingfalse(false);
  }

  // Finalizado
  playAgain() {
    return (
      <button
        type="button"
        data-testid="btn-play-again"
        className="play-again btn-neon-red"
        onClick={ this.PlayAgainClickhandler }
      >
        Play again
      </button>);
  }

  render() {
    const { score, assertion } = this.props;
    const expectedAssertions = 3;
    return (
      <>
        <Header />
        <div className="feedback-page">

          <h3 data-testid="feedback-text" className="feedback-text">
            FeedBack:
          </h3>
          <h2 data-testid="feedback-text" className="feedback-result neonText">
            { assertion < expectedAssertions ? 'Could be better.' : 'Nice job!' }
          </h2>
          <h1
            data-testid="feedback-total-score"
            className="final-score"
          >
            { score }
          </h1>
          <h1
            data-testid="feedback-total-question"
            className="feedback-points"
          >
            { assertion }
            <span> assertions </span>
          </h1>
          <Link to="/" style={ { textDecoration: 'none' } }>
            <div className="div-play-again">
              <img src={ back } alt="Voltar" className="back-img" />
              { this.playAgain() }
            </div>
          </Link>
          <Link to="/ranking" style={ { textDecoration: 'none' } }>
            <div className="div-btn-ranking">
              <img src={ trophy } alt="Ranking" className="ranking-img" />
              <button
                onClick={ this.handleClickRankBtn }
                type="button"
                data-testid="btn-ranking"
                className="btn-neon-blue btn-ranking"
              >
                Show Ranking
              </button>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  picture: state.player.srcGravatarImg,
  name: state.player.name,
  score: state.player.score,
  assertion: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  playingfalse: (bool) => dispatch(modifyPlayingTruOrFalse(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);

FeedBack.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertion: PropTypes.number.isRequired,
  playingfalse: PropTypes.func,
};

FeedBack.defaultProps = {
  playingfalse: PropTypes.func,
};
