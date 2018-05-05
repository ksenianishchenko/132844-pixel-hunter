import {ScreenType} from './data/game-data';
const statsBarString = (gameModel) => {
  let stats = [];
  gameModel.gameScreens.forEach((level, i) => {
    const answers = gameModel.answers.filter((a) => a.level === i);
    if (level.screenType === ScreenType.THREE_IMAGES) {
      let barType = `unknown`;
      if (answers.length !== 0) {
        barType = answers[0].statsBarOption;
      }
      stats.push(barType);
    } else {
      const barTypes = level.resources.map((r) => {
        const answer = answers.find((a) => a.guid === r.guid);
        if (answer) {
          return answer.statsBarOption;
        }
        return `unknown`;
      });
      stats = stats.concat(barTypes);
    }
  });
  return `
    <ul class="stats">
    ${[...stats].map((type) => {
    return `<li class="stats__result stats__result--${type}"></li>`;
  }).join(``)}
    </ul>`;
};

export default statsBarString;
