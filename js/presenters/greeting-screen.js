import Application from '../application';
import GreetingScreenView from '../views/greeting-view';
import {data} from '../data/game-data';
export default class GreetingScreen {
  constructor() {
    this.view = new GreetingScreenView(data);
    this.view.onNextScreen = Application.showRules;
  }
  get element() {
    return this.view.element;
  }
}
