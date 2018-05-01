export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concreate one`);
    }
  }
  get template() {}
  get element() {
    if (!this._element) {
      const root = document.createElement(`div`);
      root.innerHTML = this.template;
      this._element = root;
      this.bind();
    }
    return this._element;
  }
  bind() {}
}
