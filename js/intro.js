import {changeScreen} from './util';
import secondScreen from './greeting';

const firstScreen = document.querySelector(`#intro`);
const introAsterisk = firstScreen.querySelector(`.intro__asterisk`);
introAsterisk.addEventListener(`click`, () => {
  changeScreen(secondScreen);
});


export default firstScreen;
