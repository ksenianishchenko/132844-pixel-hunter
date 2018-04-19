import headerButtonTemplate from './header-button';
import livesElementTemplate from './lives';
import {SCREEN_TYPE, IMAGE_TYPE, gameData, initialState} from './data/game-data';
import {renderBlock, changeScreen} from './util';
import elementStats from './stats';
import secondScreen from './greeting';

// рендерит темплейт по данным из gameData объекта массива (данные уровня)
const getGameLevelTemplate = (levelData) => {
  switch (levelData.screenType) {
    case SCREEN_TYPE.ONE_IMAGE: {
      return `<p class="game__task">${levelData.description}</p>
      <form class="game__content  game__content--wide">
      ${[...levelData.resources].map((resource) => `
        <div class="game__option">
          <img src="${resource.src}" alt="" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="${resource.guid}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="${resource.guid}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)}
      </form>`;
    }
    case SCREEN_TYPE.TWO_IMAGES: {
      return `<p class="game__task">${levelData.description}</p>
      <form class="game__content">
        ${[...levelData.resources].map((resource) => `
          <div class="game__option">
            <img src="${resource.src}" alt="" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input name="${resource.guid}" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input name=${resource.guid} type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>`).join(``)}
      </form>`;
    }
    case SCREEN_TYPE.THREE_IMAGES: {
      return `<p class="game__task">${levelData.description}</p>
      <form class="game__content  game__content--triple">
      ${[...levelData.resources].map((resource) => `
        <div data-guid="${resource.guid}" class="game__option">
          <img src="${resource.src}" alt="" width="304" height="455">
        </div>`).join(``)}
      </form>`;
    }
  }

  // выкидываем ошибку, если тип отображения картинок текущего уровня неизвестен
  throw Error(`Unknown screen type`);
};

const gameScreen = () => {
  initialState.level = 0;
  initialState.lives = 3;
  initialState.points = 0;
  initialState.answers = [];

  // Создаем пустой div-элемент, куда мы будем скидывать весь контент игровой зоны
  const gameContainer = document.createElement(`div`);
  // Добавляем в пустой div, созданный выше, header с пустыми контейнрема для кнопки "назад",
  // таймера и жизней
  renderBlock(gameContainer, `
    <header class="header">
      <div id="backBtn"></div>
      <div id="timer"></div>
      <div id="lives"></div>
    </header>
    <div class="game" id="game"></div>`);

  // добавляем кнопку "назад" в контейнер backBtn
  const backBtn = gameContainer.querySelector(`#backBtn`);
  backBtn.addEventListener(`click`, () => {
    changeScreen(secondScreen);
  });
  renderBlock(backBtn, headerButtonTemplate);

  // добавляем таймер в контейнер timer
  renderBlock(gameContainer.querySelector(`#timer`), `<h1 class="game__timer">NN</h1>`);

  // добавляем темплейт жизней в контейнер lives.
  const livesBlock = gameContainer.querySelector(`#lives`);
  renderBlock(livesBlock, livesElementTemplate(initialState));

  const onOptionSelected = (guid, imageType) => {
    const levelData = gameData[initialState.level];
    const resources = levelData.resources;
    // узнаем ответил ли пользователь на этот вопрос
    let hasAnswer = false;
    for (let i = 0; i < initialState.answers.length; i++) {
      if (initialState.answers[i].guid === guid) {
        hasAnswer = true;
        break;
      }
    }
    if (hasAnswer === false) {
      // Если не отвечал, то проверяем правильность ответа
      const resource = resources.find((res) => res.guid === guid);
      let isCorrect = false;
      // Здесь проверяем правильность ответа
      if (resource.imgType === imageType) {
        isCorrect = true;
        initialState.points += 100;
      } else {
        initialState.lives--;
        renderBlock(livesBlock, livesElementTemplate(initialState));
        if (initialState.lives === 0) {
          changeScreen(secondScreen);
        }
      }

      // Добавляем отвеченный вопрос в initalState.answers
      // чтоб сохранить для показа и посчета в конце
      // и чтоб пользователь не отвечал на вопрос дважды
      // answers: [{guid: '00', isCorrect: false}, {guid: '01', isCorrect: true}]
      initialState.answers.push({"guid": guid, "isCorrect": isCorrect});
    }
    // Проверяем на все ли вопросы ответил игрок в текущем уровне
    let isLevelCompleted = true;
    // Если в текущем уровене нужно выбрать только одно изображения из трех, то уровень закончен
    if (levelData.screenType !== SCREEN_TYPE.THREE_IMAGES) {
      for (let i = 0; i < resources.length; i++) {
        const answered = initialState.answers.find((answer) => answer.guid === resources[i].guid);
        if (!answered) {
          isLevelCompleted = false;
          break;
        }
      }
    }
    // Если игрок ответил на все вопросы в текущем уровне
    // то прибавляем уровень в initialState и рендерим след. уровень
    if (isLevelCompleted) {
      const nextLevel = initialState.level + 1;
      if (nextLevel < gameData.length) {
        renderGameLevelScreen(nextLevel);
      } else {
        changeScreen(elementStats(initialState));
      }
    }
  };

  // вытаскивыем из заполненного div'а элемент-контейнер game
  // и сохраняем его для реюза
  const gameBlock = gameContainer.querySelector(`#game`);
  const renderGameLevelScreen = (level) => {
    // вытаскиваем из gameData данные по level'у по индексу из параметра lelel
    const currentLevel = gameData[level];
    initialState.level = level;
    // рендерим уровень и добавляем в gameBlock
    renderBlock(gameBlock, getGameLevelTemplate(currentLevel));
    const radios = gameBlock.querySelectorAll(`input[type=radio]`);
    if (radios.length === 0) {
      // Если в текущем уровне нет radio-баттонов, то ищем img
      const gameOptions = gameBlock.querySelectorAll(`.game__option`);
      for (let i = 0; i < gameOptions.length; i++) {
        gameOptions[i].addEventListener(`click`, (event) => {
          const gameOption = event.currentTarget;
          onOptionSelected(gameOption.attributes[`data-guid`].value, IMAGE_TYPE.PAINTING);
        });
      }
    } else {
      for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener(`change`, (event) => {
          const option = event.currentTarget;
          if (option.checked) {
            onOptionSelected(option.name, option.value);
          }
        });
      }
    }
  };

  // сразу рендерим уровень, который указан в initialState
  renderGameLevelScreen(initialState.level);
  return gameContainer;
};
export default gameScreen;
