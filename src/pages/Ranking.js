import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import back from '../images/back_4.png';
import trophy from '../images/trophy_1.png';
import { modifyPlayingTruOrFalse } from '../redux/actions';
import '../App.css';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false,
    };
    this.renderRanking = this.renderRanking.bind(this);
    this.backHomeClickHandler = this.backHomeClickHandler.bind(this);
  }

  backHomeClickHandler() {
    const { playingfalse } = this.props;
    playingfalse(false);
    this.setState({
      redirectHome: true,
    });
  }

  renderRanking() {
    const ranking = JSON.parse(localStorage.ranking);
    const rankingSorted = ranking.sort((a, b) => b.score - a.score);
    return (
      rankingSorted.map((user, index) => (
        <>
          <div className="user-rank-data" key={ index }>
            <span className="ranking-number">{ index + 1 }</span>
            <img src={ user.picture } alt={ user.name } />
            <p
              data-testid={ `player-name-${index}` }
              className="ranking-player-name"
            >
              { user.name }
            </p>
            <p
              data-testid={ `player-score-${index}` }
              className="ranking-score"
            >
              { user.score }
            </p>
          </div>
          <hr />
        </>
      ))
    );
  }

  render() {
    const { redirectHome } = this.state;
    if (redirectHome) return <Redirect to="/" />;
    return (
      <div className="page-ranking">
        <div className="header-ranking">
          <img src={ trophy } alt="Ranking" className="ranking-img-trophy" />
          <h2 data-testid="ranking-title" className="title-ranking">Ranking</h2>
        </div>
        <div className="div-users-ranking">
          { this.renderRanking() }
        </div>
        <div className="ranking-back-home">
          <img src={ back } alt="Voltar" className="back-img-home" />
          <button
            type="button"
            data-testid="btn-go-home"
            className="btn-neon-blue back-home"
            onClick={ this.backHomeClickHandler }
          >
            Back to Start
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playingfalse: (bool) => dispatch(modifyPlayingTruOrFalse(bool)),
});

export default connect(null, mapDispatchToProps)(Ranking);

Ranking.propTypes = {
  playingfalse: PropTypes.func,
};

Ranking.defaultProps = {
  playingfalse: PropTypes.func,
};
