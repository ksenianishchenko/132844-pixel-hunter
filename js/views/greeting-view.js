import logoTemplate from './../logo';
import footerTemplate from './../footer';
import AbstractView from './abstract-view';

export default class GreetingScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `${logoTemplate} <h1 class="greeting__asterisk">*</h1><div class="greeting__challenge"><h3>${this.state.greeting.title}</h3><p>${this.state.greeting.description}</p></div><div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div></div> ${footerTemplate}`;
  }
  bind() {
    const greetingContinue = this.element.querySelector(`.greeting__continue`);
    greetingContinue.addEventListener(`click`, this.onNextScreen);
  }
}
