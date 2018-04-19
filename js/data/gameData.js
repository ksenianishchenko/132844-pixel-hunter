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
