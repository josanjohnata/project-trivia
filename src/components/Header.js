import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import border from '../images/header_base.png';

class Header extends Component {
  render() {
    const { profileImg, profileName, profileScore } = this.props;
    return (
      <div>
        <header className="header-body">
          <img
            src={ profileImg }
            data-testid="header-profile-picture"
            alt="User profile"
          />
          <span
            data-testid="header-player-name"
            className="header-player-name"
          >
            { profileName }
          </span>
          <div className="score-div-container">
            <span className="text-score">
              SCORE
            </span>
            <span
              className="ingame-score-number"
              data-testid="header-score"
            >
              { profileScore }
            </span>
          </div>

        </header>
        <div className="border-header">
          <img src={ border } alt="" className="img-border" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profileImg: state.player.srcGravatarImg,
  profileName: state.player.name,
  profileScore: state.player.score,
});

// const mapDispatchToProps = {
//   return;
// };

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  profileImg: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  profileScore: PropTypes.number.isRequired,
};
