import footerTemplate from './../footer';
import AbstractView from './abstract-view';
import headerButtonTemplate from './../header-button';
import statsBarString from './../stats-bar';

export default class StatsScreenView extends AbstractView {
  constructor(users) {
    super();
    this.users = users;
  }
  get template() {
    return `<header class="header">
      ${headerButtonTemplate}
    </header>
    <div class="result">
      <h1>${StatsScreenView._templateTitle(this.users)}</h1>
      ${[...this.users].map((game, index) => {
    if (game.isWin) {
      return `<table class="result__table">
        <tr>
          <td class="result__number">${index + 1}.</td>
          <td colspan="2">
          ${statsBarString(game)}
          </td>
          ${StatsScreenView._templateCorrectAnswers(game.points)}
        </tr>
        ${StatsScreenView._templateFast(game.fastAnswersCount)}
        ${StatsScreenView._templateLives(game.lives)}
        ${StatsScreenView._templateSlow(game.slowAnswersCount)}
        <tr>
          ${StatsScreenView._templateTotalScore(game.points, game.lives, game.fastAnswersCount, game.slowAnswersCount)}
        </tr>
    </table>`;
    }
    return `<table class="result__table">
    <tr>
      <td class="result__number">${index + 1}.</td>
      <td colspan="2">
      ${statsBarString(game)}
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>
    </table>`;
  }).join(``)} ${footerTemplate}`;
  }
  bind() {
    const buttonBack = this.element.querySelector(`.back`);
    buttonBack.addEventListener(`click`, this.onPreviousScreen);
  }
  static _templateTitle(currentStatus) {
    if (currentStatus[0].isWin) {
      return `Победа!`;
    }
    return `Проигрыш :(`;
  }

  static _templateCorrectAnswers(correctScoresTotal) {
    return `
    <td class="result__points">×&nbsp;100</td>
    <td class="result__total">${correctScoresTotal}</td>`;
  }

  static _templateLives(lives) {
    return `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за жизни:</td>
      <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${lives * 50}</td>
    </tr>`;
  }
  static _templateTotalScore(points, lives, fastAnswersCount, slowAnswersCount) {
    let livesBonus = lives * 50;
    let fastAnswersBonus = fastAnswersCount * 50;
    let slowAnswersBonus = slowAnswersCount * 50;
    return `
    <tr>
      <td colspan="5" class="result__total  result__total--final">${points + livesBonus + fastAnswersBonus - slowAnswersBonus}</td>
    </tr>`;
  }

  static _templateFast(fastAnswersCount) {
    return `
    <tr>
      <td></td>
      <td class="result__extra">Бонус за скорость:</td>
      <td class="result__extra">${fastAnswersCount}&nbsp;<span class="stats__result stats__result--fast"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">${fastAnswersCount * 50}</td>
    </tr>`;
  }

  static _templateSlow(slowAnswersCount) {
    return `
    <tr>
      <td></td>
      <td class="result__extra">Штраф за медлительность:</td>
      <td class="result__extra">${slowAnswersCount}&nbsp;<span class="stats__result stats__result--slow"></span></td>
      <td class="result__points">×&nbsp;50</td>
      <td class="result__total">-${slowAnswersCount * 50}</td>
    </tr>`;
  }
}
