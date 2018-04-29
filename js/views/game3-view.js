import AbstractView from './abstract-view';
import {IMAGE_TYPE} from './../data/game-data';
import footerTemplate from './../footer';

export default class Game3ScreenView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }
  get template() {
    return `<p class="game__task">${this.level.description}</p>
    <form class="game__content  game__content--triple">
    ${[...this.level.resources].map((resource) => `
      <div data-guid="${resource.guid}" class="game__option">
        <img src="${resource.src}" alt="" width="304" height="455">
      </div>`).join(``)}
    </form> <div class="stats"></div> ${footerTemplate}`;
  }
  bind() {
    const gameBlock = this.element.querySelector(`.game__content`);
    const gameOptions = gameBlock.querySelectorAll(`.game__option`);
    const self = this;
    for (let i = 0; i < gameOptions.length; i++) {
      gameOptions[i].addEventListener(`click`, (event) => {
        const gameOption = event.currentTarget;
        self.onAnswer(gameOption.attributes[`data-guid`].value, IMAGE_TYPE.PAINTING);
      });
    }
  }
}
