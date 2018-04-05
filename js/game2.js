import createDomElement from './util';
import fourthScreen from './game1';

const screenId = `game-2`;
let gameOptionsArea = fourthScreen.querySelectorAll(`.game__option`);

const onGameOptionChanged = () => {
  let hasUnchecked = false;
  for (let i = 0; i < gameOptionsArea.length; i++) {
    let radios = gameOptionsArea[i].querySelectorAll(`input[type=radio]`);
    let isSelected = false;
    for (let j = 0; j < radios.length; j++) {
      if (radios[j].checked) {
        isSelected = true;
        break;
      }
    }
    if (!isSelected) {
      hasUnchecked = true;
      break;
    }
  }
  if (!hasUnchecked) {
    createDomElement(fifthScreen);
  }
};

for (let i = 0; i < gameOptionsArea.length; i++) {
  let radios = gameOptionsArea[i].querySelectorAll(`input[type=radio]`);
  for (let j = 0; j < radios.length; j++) {
    radios[j].addEventListener(`change`, onGameOptionChanged);
  }
}

const template = (screenElementId) => {
  let screenContentTemplate = document.querySelector(`#${screenElementId}`).content;
  let screenElement = screenContentTemplate.cloneNode(true);
  return screenElement;
};
const fifthScreen = template(screenId);

export default fifthScreen;
