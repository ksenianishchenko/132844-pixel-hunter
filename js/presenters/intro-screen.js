import Application from '../application';
import IntroView from '../views/intro-view';
export default class IntroScreen {
  constructor() {
    const view = new IntroView();
    view.onNextScreen = Application.showGreeting;
    this.root = view.element;
  }
  get element() {
    return this.root;
  }
  fadeOut() {
    this.view.greetingElement.classList.add(`transparent`);
  }

  fadeIn() {
    this.view.greetingElement.classList.remove(`transparent`);
  }
}
