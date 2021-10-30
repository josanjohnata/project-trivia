import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import back from '../images/back_4.png';
import about from '../images/about.png';
import arrow1 from '../images/back_1.png';
import arrow2 from '../images/back_3.png';

class About extends Component {
  constructor(props) {
    super(props);
    this.HomeBtnRender = this.HomeBtnRender.bind(this);
    this.names = this.names.bind(this);
  }

  HomeBtnRender() {
    return (
      <Link to="/" style={ { textDecoration: 'none' } }>
        <div className="about-back-home">
          <img src={ back } alt="Voltar" className="back-img-home" />
          <button
            type="button"
            className="btn-neon-blue back-home"
          >
            Back to Login
          </button>
        </div>
      </Link>
    );
  }

  names() {
    return (
      <div className="group-names">
        <img src={ arrow1 } className="arrow" alt="" />
        <h4 className="about-name">
          Camilo Lelis
        </h4>
        <h4 className="about-name">
          Diogo Augusto
        </h4>
        <h4 className="about-name">
          Johnata Pontes
        </h4>
        <h4 className="about-name">
          Marcos Mantovani
        </h4>

        <img src={ arrow2 } className="arrow" alt="" />
      </div>
    );
  }

  render() {
    return (
      <div className="about">
        <div className="header-about">
          <img src={ about } alt="" className="about-img" />
          <h2 className="title-about">Grupo 28</h2>
          <span className="name-group">[UNNAMED]</span>
        </div>
        <h3>Olá, somos um grupo de estudantes da escola Trybe! #BeTrybe</h3>
        <h3>Nosso time se compõem pelos seguintes integrantes:</h3>
        { this.names() }
        <p className="about-description">
          Neste projeto testamos nossos conhecimentos referente a
          Redux e tudo oque vimos em FrontEnd!
        </p>
        <p className="about-description">
          Realmente foi um desafio fazer uma aplicação como essa a prova de bugs
          e tentar ao máximo deixar o código limpo, legível e ainda conseguir
          ficar de bem com o Evaluator.
        </p>
        <p className="about-description">
          Estamos muito Orgulhosos com o resultado!
        </p>
        <p className="about-description">
          Esperamos que você possa se divertir com nossa aplicação/Game,
          Tenha um bom jogo!
        </p>

        <p className="about-description">
          o Texto acima é um exemplo do que podemos colocar aqui nesta página!
          <br />
          dem suas opniões para definirmos em conjunto oque colocar aqui Sobre
          o nosso Grupo!
        </p>
        { this.HomeBtnRender() }
      </div>
    );
  }
}

export default About;
