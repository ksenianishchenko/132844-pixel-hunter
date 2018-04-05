import createDomElement from './util';
import fifthScreen from './game2';

const screenId = `game-3`;
let gameOptionsElement = fifthScreen.querySelector(`.game__option`);
let radiosButtons = fifthScreen.querySelectorAll(`input[type=radio]`);

const onGameOptionChanged = () => {
  for (let j = 0; j < radiosButtons.length; j++) {
    if (radiosButtons[j].checked) {
      createDomElement(sixthScreen);
    }
  }
};

if (gameOptionsElement) {
  for (let j = 0; j < radiosButtons.length; j++) {
    radiosButtons[j].addEventListener(`change`, onGameOptionChanged);
  }
}
const template = (screenElementId) => {
  let screenContentTemplate = document.querySelector(`#${screenElementId}`).content;
  let screenElement = screenContentTemplate.cloneNode(true);
  return screenElement;
};
const sixthScreen = template(screenId);

export default sixthScreen;
