import IntroScreen from './presenters/intro-screen';
import GreetingScreen from './presenters/greeting-screen';
import RulesScreen from './presenters/rules-screen';
import GameModel from './models/game-model';
import GameScreen from './presenters/game-screen';
import StatsScreen from './presenters/stats-screen';
import {users} from './data/game-data';

const screenWrapElement = document.querySelector(`.central`);
const changeScreen = (element) => {
  screenWrapElement.innerHTML = ``;
  screenWrapElement.appendChild(element);
  return screenWrapElement;
};

export default class Aplication {
  static showWelcome() {
    const introPresenter = new IntroScreen();
    changeScreen(introPresenter.element);
  }

  static showGreeting() {
    const greetingScreen = new GreetingScreen();
    changeScreen(greetingScreen.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    changeScreen(rulesScreen.element);
  }

  static showGame(userName) {
    const model = new GameModel(userName);
    users.unshift(model);
    const gameScreen = new GameScreen(model);
    gameScreen.init();
    changeScreen(gameScreen.element);
  }

  static showStats(gameModel) {
    const statsScreen = new StatsScreen(gameModel);
    changeScreen(statsScreen.element);
  }
}
