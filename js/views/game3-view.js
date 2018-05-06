import AbstractView from './abstract-view';
import {ImageType} from './../data/game-data';
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
        <img src="${resource.image.url}" alt="" width="${resource.image.width}" height="${resource.image.height}">
      </div>`).join(``)}
    </form> <div class="stats"></div> ${footerTemplate}`;
  }
  bind() {
    const gameBlock = this.element.querySelector(`.game__content`);
    const gameOptions = gameBlock.querySelectorAll(`.game__option`);
    let photos = this.level.resources.filter((r) => r.imgType === ImageType.PHOTO);
    let screenImageType;
    if (photos.length === 1) {
      screenImageType = ImageType.PHOTO;
    } else {
      screenImageType = ImageType.PAINTING;
    }
    const self = this;
    for (let i = 0; i < gameOptions.length; i++) {
      gameOptions[i].addEventListener(`click`, (event) => {
        const gameOption = event.currentTarget;
        self.onAnswer(gameOption.dataset.guid, screenImageType);
      });
    }
  }
}
