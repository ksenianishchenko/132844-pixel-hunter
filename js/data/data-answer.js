export const checkAnswers = (answers, lives) => {
  if (answers.length !== 10) {
    return -1;
  }
  let points = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].isCorrect) {
      points += 100;
    }
    if (answers[i].seconds > 0 && answers[i].seconds < 3) {
      // Быстрый ответ
      points += 50;
    }
    if (answers[i].seconds > 5) {
      // Медленный ответ
      points -= 50;
    }
  }

  points += (lives * 50);
  return points;
};
