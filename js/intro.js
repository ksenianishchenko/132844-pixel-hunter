import GreetingScreenView from './greeting';
import {data} from './data/game-data';

const firstScreen = document.querySelector(`#intro`);
const introAsterisk = firstScreen.querySelector(`.intro__asterisk`);
introAsterisk.addEventListener(`click`, () => {
  const greetingScreen = new GreetingScreenView(data);
  greetingScreen.render();
  greetingScreen.bind();
});


export default firstScreen;
