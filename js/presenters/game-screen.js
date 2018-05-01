import Application from '../application';
import {SCREEN_TYPE} from '../data/game-data';
import Game1ScreenView from '../views/game1-view';
import Game2ScreenView from '../views/game2-view';
import Game3ScreenView from '../views/game3-view';
import LivesView from '../views/lives-view';
import TimerView from '../views/timer-view';
import headerTemplate from '../header';
import statsBarString from '../stats-bar';

export default class GameScreen {
  constructor(gameModel) {
    this.gameModel = gameModel;
    this.views = new Map();
    this.views.set(SCREEN_TYPE.TWO_IMAGES, Game1ScreenView);
    this.views.set(SCREEN_TYPE.ONE_IMAGE, Game2ScreenView);
    this.views.set(SCREEN_TYPE.THREE_IMAGES, Game3ScreenView);
  }
  get element() {
    return this.header;
  }
  init() {
    this.root = document.createElement(`div`);
    this.root.id = `root`;
    this.header = document.createElement(`div`);
    this.header.id = `header`;
    this.header.innerHTML = `${headerTemplate}`;
    this.header.appendChild(this.root);
    this.updateTimerView();
    this.changeLevel();
    const backBtn = this.header.querySelector(`.back`);
    backBtn.addEventListener(`click`, Application.showGreeting);
  }
  startTimer() {
    this.stopTimer();
    this.gameModel.resetTimer();
    const self = this;
    this._timerInterval = setInterval(() => {
      self.gameModel.tick();
      self.updateTimerView();
      if (self.gameModel.ticks >= 30) {
        self.stopTimer();
        self.updateLivesView();
        self.updateStatsBarView();
        this.gameModel.moveToNextLevel();
        this.changeLevel();
        if (this.gameModel.isDead) {
          Application.showStats(this.gameModel);
        }
      } else if (self.gameModel.ticks >= 25) {
        const timerBlock = this.header.querySelector(`#timer`);
        timerBlock.classList.add(`blink`);
      }
    }, 100);
    this.updateTimerView();
  }
  stopTimer() {
    const intervalId = this._timerInterval;
    const timerBlock = this.header.querySelector(`#timer`);
    timerBlock.classList.remove(`blink`);
    if (intervalId) {
      delete this._timerInterval;
      clearInterval(intervalId);
    }
  }
  answer(guid, imageType) {
    this.gameModel.answer(guid, imageType);
    this.updateLivesView();
    this.updateStatsBarView();
    if (this.gameModel.isDead) {
      Application.showStats(this.gameModel);
    } else {
      if (this.gameModel.isLevelCompleted) {
        if (this.gameModel.moveToNextLevel()) {
          this.changeLevel();
        } else {
          Application.showStats(this.gameModel);
        }
      }
    }
  }
  changeLevel() {
    this.updateLivesView();
    const level = this.gameModel.getCurrentLevel();
    let view;
    switch (level.screenType) {
      case SCREEN_TYPE.TWO_IMAGES: {
        view = new Game1ScreenView(level);
        break;
      }
      case SCREEN_TYPE.ONE_IMAGE: {
        view = new Game2ScreenView(level);
        break;
      }
      case SCREEN_TYPE.THREE_IMAGES: {
        view = new Game3ScreenView(level);
        break;
      }
      default: {
        throw Error(`Unknown view ${level.screenType}`);
      }
    }
    const self = this;
    view.onAnswer = function (guid, imageType) {
      self.answer(guid, imageType);
    };
    this.root.innerHTML = ``;
    this.root.appendChild(view.element);
    this.updateStatsBarView();
    this.startTimer();
  }
  updateLivesView() {
    const livesView = new LivesView(this.gameModel.lives);
    const livesBlock = this.header.querySelector(`#lives`);
    livesBlock.innerHTML = ``;
    livesBlock.appendChild(livesView.element);
  }
  updateTimerView() {
    const timerView = new TimerView(this.gameModel.ticks);
    const timerBlock = this.header.querySelector(`#timer`);
    timerBlock.innerHTML = ``;
    timerBlock.appendChild(timerView.element);
  }
  updateStatsBarView() {
    const statsBarView = statsBarString(this.gameModel);
    const statsBarViewBlock = this.header.querySelector(`.stats`);
    statsBarViewBlock.innerHTML = statsBarView;
  }
}
