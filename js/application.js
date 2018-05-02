import IntroScreen from './presenters/intro-screen';
import GreetingScreen from './presenters/greeting-screen';
import RulesScreen from './presenters/rules-screen';
import GameModel from './models/game-model';
import GameScreen from './presenters/game-screen';
import StatsScreen from './presenters/stats-screen';
import {users, SCREEN_TYPE} from './data/game-data';
import Loader from './loader';
import ErrorScreen from './presenters/error-screen';

const screenWrapElement = document.querySelector(`.central`);
const changeScreen = (element) => {
  screenWrapElement.innerHTML = ``;
  screenWrapElement.appendChild(element);
  return screenWrapElement;
};

const toGameData = (screensArray) => {
  const gameScreens = screensArray.map((screen, screenIndex) => {
    let screenType;
    if (screen.type === `tinder-like`) {
      screenType = SCREEN_TYPE.ONE_IMAGE;
    } else if (screen.type === `two-of-two`) {
      screenType = SCREEN_TYPE.TWO_IMAGES;
    } else if (screen.type === `one-of-three`) {
      screenType = SCREEN_TYPE.THREE_IMAGES;
    } else {
      throw new Error(`Unknown screen type ${screen.type}`);
    }
    const answers = screen.answers.map((answer, answerIndex) => {
      return {
        guid: screenIndex + `:` + answerIndex,
        imgType: answer.type,
        image: {
          url: answer.image.url,
          width: answer.image.width,
          height: answer.image.height
        }
      };
    });

    return {
      'screenType': screenType,
      'description': screen.question,
      'resources': answers
    };
  });

  return gameScreens;
};

let screens = [];

export default class Aplication {
  static start() {
    Loader.loadData().then((json) => {
      screens = toGameData(json);
      Aplication.showWelcome();
    }).catch((e) => Aplication.showError(e));
  }

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
    const model = new GameModel(userName, screens);
    users.unshift(model);
    const gameScreen = new GameScreen(model);
    gameScreen.init();
    changeScreen(gameScreen.element);
  }

  static showStats() {
    const playerName = users[0].playerName;
    const stats = users[0]._state;
    const statsScreen = new StatsScreen(screens);
    changeScreen(statsScreen.element);
    Loader.saveResults(stats.answers, playerName).then(() => Loader.loadResults(playerName).then(() => changeScreen(new StatsScreen(screens).element))).catch((e) => Aplication.showError(e));
  }

  static showError(error) {
    const errorView = new ErrorScreen(error);
    changeScreen(errorView.element);
  }
}
