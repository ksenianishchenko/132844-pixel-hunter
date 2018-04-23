import {changeScreen} from './util';
import Game1ScreenView from './game1';
import footerTemplate from './footer';
import headerButtonTemplate from './header-button';
import AbstractView from './data/abstract-view';
import {gameData, data} from './data/game-data';
import GreetingScreenView from './greeting';

export default class RulesScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<header class="header">
      ${headerButtonTemplate}
    </header>
    <div class="rules">
      <h1 class="rules__title">${this.state.rules.title}</h1>
      <p class="rules__description">${this.state.rules.description}
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div> ${footerTemplate}`;
  }

  get element() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.template;
      this._element = div;
    }
    return this._element;
  }

  render() {
    changeScreen(this.element);
  }

  bind() {
    const goButton = this.element.querySelector(`.rules__button`);
    const rulesInput = this.element.querySelector(`.rules__input`);
    const buttonBack = this.element.querySelector(`.back`);

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
      const game1Screen = new Game1ScreenView(gameData[0]);
      game1Screen.render();
    });

    buttonBack.addEventListener(`click`, () => {
      const greetingScreen = new GreetingScreenView(data);
      greetingScreen.render();
      greetingScreen.bind();
    });
  }
}
