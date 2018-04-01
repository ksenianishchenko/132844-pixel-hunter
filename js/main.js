const screensArray = [`greeting`, `rules`, `game-1`, `game-2`, `game-3`, `stats`];

let screenWrapElement = document.querySelector(`.central`);

let i = 0;

const screenShow = (screenTemplateId) => {
  let screenContentTemplate = document.querySelector(`#${screenTemplateId}`).content;
  let screenElement = screenContentTemplate.cloneNode(true);
  screenWrapElement.innerHTML = ``;
  screenWrapElement.appendChild(screenElement);
};

screenShow(screensArray[i]);

document.addEventListener(`keydown`, function (e) {
  if (!e.altKey) {
    return;
  }
  let index = i;
  if (e.keyCode === 39) {
    index++;
  } else if (e.keyCode === 37) {
    index--;
  }
  if (index >= screensArray.length || index < 0) {
    return;
  }
  i = index;
  screenShow(screensArray[i]);
});
