import ErrorView from '../views/error-view';

export default class ErrorScreen {
  constructor(error) {
    const view = new ErrorView(error);
    this.root = view.element;
  }
  get element() {
    return this.root;
  }
}
