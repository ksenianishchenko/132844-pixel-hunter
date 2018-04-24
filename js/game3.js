import AbstractView from './data/abstract-view';
import {changeScreen, renderBlock} from './util';
import {initialState, data, IMAGE_TYPE} from './data/game-data';
import GreetingScreenView from './greeting';
import StatsView from './stats';
import headerTemplate from './header';
import livesElementTemplate from './lives';

export default class Game3ScreenView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }
  get template() {
    return `${headerTemplate} <p class="game__task">${this.level.description}</p>
    <form class="game__content  game__content--triple">
    ${[...this.level.resources].map((resource) => `
      <div data-guid="${resource.guid}" class="game__option">
        <img src="${resource.src}" alt="" width="304" height="455">
      </div>`).join(``)}
    </form>`;
  }

  get element() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.template;
      this._element = div;
      this.bind();
    }
    return this._element;
  }

  render() {
    changeScreen(this.element);
    renderBlock(document.querySelector(`#timer`), `<h1 class="game__timer">NN</h1>`);
    const livesBlock = document.querySelector(`#lives`);
    renderBlock(livesBlock, livesElementTemplate(initialState));
  }

  onOptionSelected(guid, imageType) {
    const resources = this.level.resources;
    // Если не отвечал, то проверяем правильность ответа
    const resource = resources.find((res) => res.guid === guid);
    let isCorrect = false;
    // Здесь проверяем правильность ответа
    if (resource.imgType === imageType) {
      isCorrect = true;
      initialState.points += 100;
    } else {
      initialState.lives--;
      // renderBlock(livesBlock, livesElementTemplate(initialState));
      if (initialState.lives === 0) {
        const greetingScreen = new GreetingScreenView(data);
        greetingScreen.render(data);
        greetingScreen.bind();
        return;
      }
    }

    initialState.answers.push({"guid": guid, "isCorrect": isCorrect});

    const statsScreen = new StatsView(data, initialState);
    statsScreen.render();
  }

  bind() {
    const gameBlock = this.element.querySelector(`.game__content`);
    const gameOptions = gameBlock.querySelectorAll(`.game__option`);
    for (let i = 0; i < gameOptions.length; i++) {
      gameOptions[i].addEventListener(`click`, (event) => {
        const gameOption = event.currentTarget;
        this.onOptionSelected(gameOption.attributes[`data-guid`].value, IMAGE_TYPE.PAINTING);
      });
    }
    const backBtn = this.element.querySelector(`#backBtn`);
    backBtn.addEventListener(`click`, () => {
      const greetingScreen = new GreetingScreenView(data);
      greetingScreen.render();
      greetingScreen.bind();
    });
  }
}
