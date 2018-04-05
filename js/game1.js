import createDomElement from './util';
import thirdScreen from './rules';

const screenId = `game-1`;
const goButton = thirdScreen.querySelector(`.rules__button`);
const rulesInput = thirdScreen.querySelector(`.rules__input`);
rulesInput.addEventListener(`change`, () => {
  if (rulesInput.value !== ``) {
    goButton.removeAttribute(`disabled`);
  }
});
goButton.addEventListener(`click`, () => {
  createDomElement(fourthScreen);
});
const template = (screenElementId) => {
  let screenContentTemplate = document.querySelector(`#${screenElementId}`).content;
  let screenElement = screenContentTemplate.cloneNode(true);
  return screenElement;
};
const fourthScreen = template(screenId);

export default fourthScreen;
