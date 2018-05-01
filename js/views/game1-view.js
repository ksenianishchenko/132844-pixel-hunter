import AbstractView from './abstract-view';
import footerTemplate from './../footer';

export default class Game1ScreenView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }
  get template() {
    return `<p class="game__task">${this.level.description}</p>
    <form class="game__content">
      ${[...this.level.resources].map((resource) => `
        <span>${resource.imgType}</span>
        <div class="game__option">
          <img src="${resource.image.url}" alt="" width="${resource.image.width}" height="${resource.image.height}">
          <label class="game__answer game__answer--photo">
            <input name="${resource.guid}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name=${resource.guid} type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)}
    </form> <div class="stats"></div> ${footerTemplate}`;
  }

  bind() {
    const gameBlock = this.element.querySelector(`.game__content`);
    const radios = gameBlock.querySelectorAll(`input[type=radio]`);
    const self = this;
    for (let i = 0; i < radios.length; i++) {
      radios[i].addEventListener(`change`, (event) => {
        const option = event.currentTarget;
        if (option.checked) {
          self.onAnswer(option.name, option.value);
        }
      });
    }
  }
}
