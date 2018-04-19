import {createDomElement, changeScreen} from './util';
import gameScreen from './game';
import secondScreen from './greeting';
import footerTemplate from './footer';
import headerButtonTemplate from './header-button';
import {data} from './data/game-data';

const elementRules = () => {
  const content = `<header class="header">
    ${headerButtonTemplate}
  </header>
  <div class="rules">
    <h1 class="rules__title">${data.rules.title}</h1>
    <p class="rules__description">${data.rules.description}
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>`;

  const article = `${content} ${footerTemplate}`;
  return createDomElement(article);
};


const thirdScreen = elementRules();
const goButton = thirdScreen.querySelector(`.rules__button`);
const rulesInput = thirdScreen.querySelector(`.rules__input`);
const buttonBack = thirdScreen.querySelector(`.back`);

rulesInput.addEventListener(`keyup`, (event) => {
  if (event.target.value !== ``) {
    goButton.removeAttribute(`disabled`);
  } else {
    goButton.setAttribute(`disabled`, `disabled`);
  }
});

goButton.addEventListener(`click`, () => {
  rulesInput.value = ``;
  goButton.setAttribute(`disabled`, `disabled`);
  changeScreen(gameScreen());
});

buttonBack.addEventListener(`click`, () => {
  changeScreen(secondScreen);
});

export default thirdScreen;
