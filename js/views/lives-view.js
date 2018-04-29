import AbstractView from './abstract-view';

export default class LivesView extends AbstractView {
  constructor(lives) {
    super();
    this.lives = lives;
  }
  get template() {
    return `<div class="game__lives">
      ${new Array(3 - this.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${new Array(this.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>`;
  }
}
