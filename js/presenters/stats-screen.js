import Application from '../application';
import StatsView from './../views/stats-view';
import {users} from '../data/game-data';
export default class StatsScreen {
  constructor() {
    const view = new StatsView(users);
    view.onPreviousScreen = Application.showGreeting;
    this.root = view.element;
  }
  get element() {
    return this.root;
  }
}
