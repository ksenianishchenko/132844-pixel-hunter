import createDomElement from './util';
import secondScreen from './greeting';

const screenId = `rules`;
const greetingContinue = secondScreen.querySelector(`.greeting__continue`);

greetingContinue.addEventListener(`click`, () => {
  createDomElement(thirdScreen);
});

const template = (screenElementId) => {
  let screenContentTemplate = document.querySelector(`#${screenElementId}`).content;
  let screenElement = screenContentTemplate.cloneNode(true);
  return screenElement;
};
const thirdScreen = template(screenId);

export default thirdScreen;
