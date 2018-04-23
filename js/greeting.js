import {changeScreen} from './util';
import RulesScreenView from './rules';
import logoTemplate from './logo';
import footerTemplate from './footer';
import {data} from './data/game-data';
import AbstractView from './data/abstract-view';

export default class GreetingScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `${logoTemplate} <h1 class="greeting__asterisk">*</h1><div class="greeting__challenge"><h3>${this.state.greeting.title}</h3><p>${this.state.greeting.description}</p></div><div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div></div> ${footerTemplate}`;
  }

  get element() {
    if (!this._element) {
      const div = document.createElement(`div`);
      div.innerHTML = this.template;
      this._element = div;
    }

    return this._element;
  }

  render() {
    changeScreen(this.element);
  }
  bind() {
    const greetingContinue = document.querySelector(`.greeting__continue`);
    greetingContinue.addEventListener(`click`, () => {
      const rulesScreen = new RulesScreenView(data);
      rulesScreen.render();
      rulesScreen.bind();
    });
  }
}
