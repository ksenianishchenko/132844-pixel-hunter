import createDomElement from './util';
import secondScreen from './greeting';
import sixthScreen from './game3';

let gameOptionsElement = sixthScreen.querySelectorAll(`.game__option`);

const onGameOptionsElementChecked = () => {
  createDomElement(seventhScreen);
};

for (let i = 0; i < gameOptionsElement.length; i++) {
  gameOptionsElement[i].addEventListener(`click`, onGameOptionsElementChecked);
}


const screenId = `stats`;
const template = (screenElementId) => {
  let screenContentTemplate = document.querySelector(`#${screenElementId}`).content;
  let screenElement = screenContentTemplate.cloneNode(true);
  return screenElement;
};
let seventhScreen = template(screenId);

if (seventhScreen) {
  let buttonBack = seventhScreen.querySelector(`.back`);
  buttonBack.addEventListener(`click`, () => {
    createDomElement(secondScreen);
  });
}

export default seventhScreen;
