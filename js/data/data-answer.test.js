import {checkAnswers} from './data-answer';
import {assert} from 'chai';

describe(`Check answers`, () => {
  it(`should answer 10 questions`, () => {
    const answers = [
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
    ];
    assert.equal(checkAnswers(answers, 3), -1);
    assert.equal(checkAnswers(answers, 2), -1);
  });

  it(`should return correct points`, () => {
    const answers = [
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
      {isCorrect: true, seconds: 5},
    ];
    assert.equal(checkAnswers(answers, 3), 1150);
    assert.equal(checkAnswers(answers, 2), 1100);
    assert.equal(checkAnswers(answers, 1), 1050);
    assert.equal(checkAnswers(answers, 0), 1000);

    answers[0].seconds = 1;
    assert.equal(checkAnswers(answers, 3), 1200);

    answers[0].isCorrect = false;
    assert.equal(checkAnswers(answers, 3), 1100);

    answers[0].seconds = 10;
    assert.equal(checkAnswers(answers, 3), 1000);
  });
});
