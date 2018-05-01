import AbstractView from './abstract-view';
export default class TimerView extends AbstractView {
  constructor(ticks) {
    super();
    this.ticks = ticks;
  }
  get template() {
    return `<h1 class="game__timer">${this.ticks}</h1>`;
  }
  bind() {
  }
}
