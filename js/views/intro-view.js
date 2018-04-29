import AbstractView from './abstract-view';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }
  get template() {
    return `<h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;
  }
  get element() {
    if (!this._element) {
      const root = document.createElement(`div`);
      root.className = `intro`;
      root.id = `intro`;
      root.innerHTML = this.template;
      this._element = root;
      this.bind();
    }
    return this._element;
  }
  bind() {
    const asteriks = this.element.querySelector(`.intro__asterisk`);
    asteriks.addEventListener(`click`, this.onNextScreen);
  }
}
