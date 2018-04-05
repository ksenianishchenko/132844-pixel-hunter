import createDomElement from './util';
import firstScreen from './intro';

const screenId = `greeting`;
const introAsterisk = firstScreen.querySelector(`.intro__asterisk`);
introAsterisk.addEventListener(`click`, () => {
  createDomElement(secondScreen);
});
const template = (screenElementId) => {
  let screenContentTemplate = document.querySelector(`#${screenElementId}`).content;
  let screenElement = screenContentTemplate.cloneNode(true);
  return screenElement;
};
const secondScreen = template(screenId);

export default secondScreen;
