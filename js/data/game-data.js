import pictures from './pictures';

export const data = {
  greeting: {
    title: `Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!`,
    description: `Правила игры просты.<br>Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>Задача кажется тривиальной, но не думай, что все так просто.<br>Фотореализм обманчив и коварен.<br>Помни, главное — смотреть очень внимательно.`
  },
  rules: {
    title: `Правила`,
    description: `Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?`
  },
  game1: {
    description: `Угадайте для каждого изображения фото или рисунок?`
  },
  game2: {
    description: `Угадай, фото или рисунок?`
  },
  game3: {
    description: `Найдите рисунок среди изображений`
  },
  stats: {
    title: `Победа!`
  }
};

export const initialState = {
  lives: 3,
  points: 0,
  answers: []
};

const SCREEN_TYPE_ONE = `one`;
const SCREEN_TYPE_TWO = `one1`;
const SCREEN_TYPE_THREE = `one2`;


const IMG_TYPE_PAINTING = `paint`;
const IMG_TYPE_PHOTO = `photo`;

export const game = [
  {
    screenType: SCREEN_TYPE_ONE,
    resources: [
      {
        guid: `00`,
        imgType: IMG_TYPE_PAINTING,
        src: pictures.paintings[0]
      },
      {
        guid: `01`,
        imgType: IMG_TYPE_PHOTO,
        src: pictures.photos[0]
      }
    ]
  },
  {screenType: SCREEN_TYPE_TWO,
    resources: [
      {
        guid: `10`,
        imgType: IMG_TYPE_PAINTING,
        src: pictures.paintings[1]
      }
    ]
  },
  {screenType: SCREEN_TYPE_THREE,
    resources: [
      {
        guid: `20`,
        imgType: IMG_TYPE_PAINTING,
        src: pictures.paintings[2]
      },
      {
        guid: `21`,
        imgType: IMG_TYPE_PHOTO,
        src: pictures.photos[1],
      },
      {
        guid: `22`,
        imgType: IMG_TYPE_PHOTO,
        src: pictures.photos[2],
      }
    ]
  }
];
