import Application from '../application';
import RulesView from '../views/rules-view';
export default class RulesScreen {
  constructor() {
    const view = new RulesView();
    view.onNextScreen = Application.showGame;
    view.onPreviousScreen = Application.showGreeting;
    this.root = view.element;
  }
  get element() {
    return this.root;
  }
}
