import footerTemplate from './../footer';
import headerButtonTemplate from './../header-button';
import AbstractView from './abstract-view';
import {data} from './../data/game-data';

export default class RulesScreenView extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `<header class="header">
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
    </div> ${footerTemplate}`;
  }
  bind() {
    const goButton = this.element.querySelector(`.rules__button`);
    const rulesInput = this.element.querySelector(`.rules__input`);

    rulesInput.addEventListener(`keyup`, (event) => {
      if (event.target.value !== ``) {
        goButton.removeAttribute(`disabled`);
      } else {
        goButton.setAttribute(`disabled`, `disabled`);
      }
    });

    const self = this;
    goButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const username = rulesInput.value;
      rulesInput.value = ``;
      goButton.setAttribute(`disabled`, `disabled`);
      self.onNextScreen(username);
    });

    const buttonBack = this.element.querySelector(`.back`);
    buttonBack.addEventListener(`click`, function () {
      self.onPreviousScreen();
    });
  }
}
