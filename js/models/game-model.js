import {SCREEN_TYPE} from './../data/game-data';

export default class GameModel {
  constructor(playerName, gameScreens) {
    this.playerName = playerName;
    this.gameScreens = gameScreens;
    this.restart();
  }
  restart() {
    this._state = {
      lives: 3,
      answers: [],
      points: 0,
      level: 0,
      fastAnswersCount: 0,
      slowAnswersCount: 0
    };
    this.resetTimer();
  }
  resetTimer() {
    this.ticks = 0;
  }
  tick() {
    this.ticks++;
    if (this.ticks === 30) {
      const level = this.getCurrentLevel();
      level.resources.every((r) => {
        this.answer(r.guid, ``);
      });
    }
  }
  getCurrentLevel() {
    return this.gameScreens[this._state.level];
  }
  answer(imageId, imageType) {
    const answerTime = this.ticks;
    const levelData = this.getCurrentLevel();
    let hasAnswer = false;
    for (let i = 0; i < this._state.answers.length; i++) {
      if (this._state.answers[i].guid === imageId) {
        hasAnswer = true;
        break;
      }
    }
    if (!hasAnswer) {
      const resource = levelData.resources.find((r) => r.guid === imageId);
      let isCorrect = false;
      let statsOption = `wrong`;
      if (resource.imgType === imageType) {
        this._state.points += 100;
        isCorrect = true;
        if (answerTime <= 10) {
          statsOption = `fast`;
          this._state.fastAnswersCount++;
        } else if (answerTime > 10 && answerTime < 20) {
          statsOption = `correct`;
        } else {
          statsOption = `slow`;
          this._state.slowAnswersCount++;
        }
      } else {
        this._state.points -= 50;
        statsOption = `wrong`;
        this.die();
      }
      this._state.answers.push({
        'level': this._state.level,
        'guid': imageId,
        'isCorrect': isCorrect,
        'statsBarOption': statsOption
      });
    }
  }
  die() {
    this._state.lives--;
  }
  get isDead() {
    return this._state.lives === 0;
  }
  moveToNextLevel() {
    if (this._state.level + 1 < this.gameScreens.length) {
      this._state.level++;
      return true;
    }
    return false;
  }
  get isLevelCompleted() {
    const levelData = this.getCurrentLevel();
    let isFinished = false;
    for (let i = 0; i < levelData.resources.length; i++) {
      const guid = levelData.resources[i].guid;
      const answer = this._state.answers.find((a) => a.guid === guid);
      if (levelData.screenType === SCREEN_TYPE.THREE_IMAGES) {
        if (answer) {
          isFinished = true;
          break;
        }
      } else {
        if (answer) {
          isFinished = true;
        } else {
          isFinished = false;
          break;
        }
      }
    }
    return isFinished;
  }
  get points() {
    return this._state.points;
  }
  get lives() {
    return this._state.lives;
  }
  get answers() {
    return this._state.answers;
  }
  get fastAnswersCount() {
    return this._state.fastAnswersCount;
  }
  get slowAnswersCount() {
    return this._state.slowAnswersCount;
  }
  get isWin() {
    return !(this._state.lives === 0);
  }
}
