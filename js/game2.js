import AbstractView from './data/abstract-view';
import {changeScreen, renderBlock} from './util';
import {initialState, data, gameData} from './data/game-data';
import GreetingScreenView from './greeting';
import Game3ScreenView from './game3';
import headerTemplate from './header';
import livesElementTemplate from './lives';

export default class Game2ScreenView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }
  get template() {
    return `${headerTemplate} <p class="game__task">${this.level.description}</p>
    <form class="game__content  game__content--wide">
    ${[...this.level.resources].map((resource) => `
      <div class="game__option">
        <img src="${resource.src}" alt="" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="${resource.guid}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="${resource.guid}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
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

  bind() {
    const gameBlock = this.element.querySelector(`.game__content`);
    const radios = gameBlock.querySelectorAll(`input[type=radio]`);
    const self = this;
    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener(`change`, (event) => {
        const option = event.currentTarget;
        if (option.checked) {
          self.onOptionSelected(option.name, option.value);
        }
      });
    }
    const backBtn = this.element.querySelector(`#backBtn`);
    backBtn.addEventListener(`click`, () => {
      const greetingScreen = new GreetingScreenView(data);
      greetingScreen.render();
      greetingScreen.bind();
    });
  }

  onOptionSelected(guid, imageType) {
    const resources = this.level.resources;
    // узнаем ответил ли пользователь на этот вопрос
    let hasAnswer = false;
    for (let i = 0; i < initialState.answers.length; i++) {
      if (initialState.answers[i].guid === guid) {
        hasAnswer = true;
        break;
      }
    }
    if (hasAnswer === false) {
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
          greetingScreen.render();
        }
      }

      // Добавляем отвеченный вопрос в initalState.answers
      // чтоб сохранить для показа и посчета в конце
      // и чтоб пользователь не отвечал на вопрос дважды
      // answers: [{guid: '00', isCorrect: false}, {guid: '01', isCorrect: true}]
      initialState.answers.push({"guid": guid, "isCorrect": isCorrect});
    }

    // Проверяем на все ли вопросы ответил игрок в текущем уровне
    let isLevelCompleted = true;
    for (let i = 0; i < resources.length; i++) {
      const answered = initialState.answers.find((answer) => answer.guid === resources[i].guid);
      if (!answered) {
        isLevelCompleted = false;
        break;
      }
    }
    // Если игрок ответил на все вопросы в текущем уровне
    // то прибавляем уровень в initialState и рендерим след. уровень
    if (isLevelCompleted) {
      const game3Screen = new Game3ScreenView(gameData[2]);
      game3Screen.render();
    }
  }
}
