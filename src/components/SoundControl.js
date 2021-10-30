import { Howl } from 'howler';
import mainTheme from '../sounds/ShowDoMilhaoTheme.mp3';
import Certa from '../sounds/certaResposta.mp3';
import Proxima from '../sounds/proximaPergunta.mp3';
import Errou from '../sounds/Errou.mp3';

const sfx = {
  main: new Howl({
    src: [mainTheme],
    volume: 0.08,
  }),
  certa: new Howl({
    src: [Certa],
  }),
  proxima: new Howl({
    src: [Proxima],
  }),
  errou: new Howl({
    src: [Errou],
  }),
};

function stopMain() {
  sfx.main.stop();
}

function playMain() {
  if (!sfx.main.playing()) {
    sfx.main.play();
  }
}
//
function playProxima() {
  sfx.proxima.play();
}

function stopProxima() {
  sfx.certa.stop();
}

function playCerta() {
  sfx.certa.play();
}

function playErrou() {
  sfx.errou.play();
}

function stopCertaErrouSound() {
  sfx.certa.stop();
  sfx.errou.stop();
}

export {
  playMain,
  stopMain,
  playProxima,
  playCerta,
  stopProxima,
  playErrou,
  stopCertaErrouSound,
};
