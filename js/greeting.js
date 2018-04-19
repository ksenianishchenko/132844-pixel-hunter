import {createDomElement, changeScreen} from './util';
import thirdScreen from './rules';
import logoTemplate from './logo';
import footerTemplate from './footer';
import {data} from './data/game-data';

const elementGreeting = () => {
  const content = `<h1 class="greeting__asterisk">*</h1><div class="greeting__challenge"><h3>${data.greeting.title}</h3><p>${data.greeting.description}</p></div><div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div></div>`;

  const article = `${logoTemplate} ${content} ${footerTemplate}`;

  return createDomElement(article);
};
const secondScreen = elementGreeting();
const greetingContinue = secondScreen.querySelector(`.greeting__continue`);

greetingContinue.addEventListener(`click`, () => {
  changeScreen(thirdScreen);
});

export default secondScreen;
