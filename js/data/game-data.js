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

export const SCREEN_TYPE = {
  ONE_IMAGE: 1,
  TWO_IMAGES: 2,
  THREE_IMAGES: 3
};

export const IMAGE_TYPE = {
  PHOTO: `photo`,
  PAINTING: `paint`
};

export const initialState = {
  level: 0,
  lives: 3,
  points: 0,
  answers: []
};

const pictures = {
  paintings: [
    `https://k42.kn3.net/CF42609C8.jpg`,
    `https://k42.kn3.net/D2F0370D6.jpg`,
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  photos: [
    `http://i.imgur.com/1KegWPz.jpg`,
    `https://i.imgur.com/DiHM5Zb.jpg`,
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

export const gameData = [
  {
    screenType: SCREEN_TYPE.TWO_IMAGES,
    description: `Угадайте для каждого изображения фото или рисунок?`,
    resources: [
      {
        guid: `00`,
        imgType: IMAGE_TYPE.PAINTING,
        src: pictures.paintings[0]
      },
      {
        guid: `01`,
        imgType: IMAGE_TYPE.PHOTO,
        src: pictures.photos[0]
      }
    ]
  },
  {
    screenType: SCREEN_TYPE.ONE_IMAGE,
    description: `Угадай, фото или рисунок?`,
    resources: [
      {
        guid: `10`,
        imgType: IMAGE_TYPE.PAINTING,
        src: pictures.paintings[1]
      }
    ]
  },
  {
    screenType: SCREEN_TYPE.THREE_IMAGES,
    description: `Найдите рисунок среди изображений`,
    resources: [
      {
        guid: `20`,
        imgType: IMAGE_TYPE.PAINTING,
        src: pictures.paintings[2]
      },
      {
        guid: `21`,
        imgType: IMAGE_TYPE.PHOTO,
        src: pictures.photos[1],
      },
      {
        guid: `22`,
        imgType: IMAGE_TYPE.PHOTO,
        src: pictures.photos[2],
      }
    ]
  }
];
