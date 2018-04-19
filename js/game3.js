import {createDomElement, changeScreen} from './util';
import statsScreen from './stats';
import secondScreen from './greeting';
import footerTemplate from './footer';
import headerButtonTemplate from './header-button';
import {data, game} from './data/game-data';
import livesElementTemplate from './lives';

const elementGame3 = () => {
  const content = `<header class="header">
    ${headerButtonTemplate}
    <h1 class="game__timer">NN</h1>
    ${livesElementTemplate}
  </header>
  <div class="game">
    <p class="game__task">${data.game3.description}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${game[2].resources[0].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${game[2].resources[1].src}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${game[2].resources[2].src}" alt="Option 1" width="304" height="455">
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>`;

  const article = `${content} ${footerTemplate}`;

  return createDomElement(article);
};

const sixthScreen = elementGame3();
let gameOptionsElement = sixthScreen.querySelectorAll(`.game__option`);
const buttonBack = sixthScreen.querySelector(`.back`);

const onGameOptionsElementChecked = () => {
  changeScreen(statsScreen);
};

for (let i = 0; i < gameOptionsElement.length; i++) {
  gameOptionsElement[i].addEventListener(`click`, onGameOptionsElementChecked);
}

buttonBack.addEventListener(`click`, () => {
  changeScreen(secondScreen);
});

export default sixthScreen;
