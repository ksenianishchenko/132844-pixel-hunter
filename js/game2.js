import {createDomElement, changeScreen} from './util';
import sixthScreen from './game3';
import secondScreen from './greeting';
import footerTemplate from './footer';
import headerButtonTemplate from './header-button';
import {data, game} from './data/game-data';
import livesElementTemplate from './lives';

const elementGame2 = () => {
  const content = `<header class="header">
    ${headerButtonTemplate}
    <h1 class="game__timer">NN</h1>
    ${livesElementTemplate}
  </header>
  <div class="game">
    <p class="game__task">${data.game2.description}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${game[1].resources[0].src}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
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

const fifthScreen = elementGame2();
const buttonBack = fifthScreen.querySelector(`.back`);
let gameOptionsElement = fifthScreen.querySelector(`.game__option`);
let radiosButtons = fifthScreen.querySelectorAll(`input[type=radio]`);

const onGameOptionChanged = () => {
  for (let j = 0; j < radiosButtons.length; j++) {
    if (radiosButtons[j].checked) {
      changeScreen(sixthScreen);
      radiosButtons[j].checked = false;
    }
  }
};

if (gameOptionsElement) {
  for (let j = 0; j < radiosButtons.length; j++) {
    radiosButtons[j].addEventListener(`change`, onGameOptionChanged);
  }
}

buttonBack.addEventListener(`click`, () => {
  changeScreen(secondScreen);
});

export default fifthScreen;
