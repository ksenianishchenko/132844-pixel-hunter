import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }
  get template() {
    return `<div>Произошла ошибка ${this.error}</div>`;
  }
}
