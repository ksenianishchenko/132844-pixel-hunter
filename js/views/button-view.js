import AbstractView from './data/abstract-view';

export default class ButtonView extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `<div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>`;
  }
  bind() {
    this.element.onclick = (evt) => {
      evt.preventDefault();
      this.onClick();
    };
  }

  onClick() {}
}
