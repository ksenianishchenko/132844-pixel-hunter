import {createDomElement} from './../util';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concreate one`);
    }
  }
  get template() {}
  get element() {
    if (this.element) {
      return this.element;
    }
    this.element = this.render();
    this.bind(this.element);
    return this.element;
  }
  render() {
    return createDomElement(this.template);
  }
  bind(element) {
    return element;
  }

}
