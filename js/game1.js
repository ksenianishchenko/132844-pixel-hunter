import {createDomElement, changeScreen, renderBlock} from './util';
import fifthScreen from './game2';
import secondScreen from './greeting';
import footerTemplate from './footer';
import headerButtonTemplate from './header-button';
import {data, initialState, game} from './data/game-data';
import livesElementTemplate from './lives';
import {checkAnswers} from './data/data-answer';

const lives = livesElementTemplate(initialState);

const elementGame1 = () => {
  const content = `<header class="header">
    ${headerButtonTemplate}
    <div id="timer">
      <h1 class="game__timer">NN</h1>
    </div>
    <div id="lives">
      ${lives}
    </div>
  </header>
  <div class="game">
    <p class="game__task">${data.game1.description}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${game[0].resources[0].src}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${game[0].resources[1].src}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
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
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>`;

  const article = `${content} ${footerTemplate}`;

  return createDomElement(article);
};

const fourthScreen = elementGame1();
const buttonBack = fourthScreen.querySelector(`.back`);
const gameOptionsArea = fourthScreen.querySelectorAll(`.game__option`);

const onGameOptionChanged = () => {
  let hasUnchecked = false;
  for (let i = 0; i < gameOptionsArea.length; i++) {
    let radios = gameOptionsArea[i].querySelectorAll(`input[type=radio]`);
    let isSelected = false;
    for (let j = 0; j < radios.length; j++) {
      if (radios[j].checked) {
        isSelected = true;
        if (radios[j].value === game[0].resources[0].imgType) {
          initialState.answers += 1;
          checkAnswers(initialState.answers, initialState.lives);
        } else {
          initialState.lives -= 1;
        }

        renderBlock(document.getElementById(`lives`), livesElementTemplate(initialState))
        break;
      }
    }
    if (!isSelected) {
      hasUnchecked = true;
      break;
    }
  }
  if (!hasUnchecked) {
    for (let i = 0; i < gameOptionsArea.length; i++) {
      let radios = gameOptionsArea[i].querySelectorAll(`input[type=radio]`);
      for (let j = 0; j < radios.length; j++) {
        radios[j].checked = false;
      }
    }
    changeScreen(fifthScreen);
  }
};

for (let i = 0; i < gameOptionsArea.length; i++) {
  let radios = gameOptionsArea[i].querySelectorAll(`input[type=radio]`);
  for (let j = 0; j < radios.length; j++) {
    radios[j].addEventListener(`change`, onGameOptionChanged);
  }
}

buttonBack.addEventListener(`click`, () => {
  changeScreen(secondScreen);
});

export default fourthScreen;
