import {getTimer} from './timer';
import {assert} from 'chai';

describe(`Check timer`, () => {
  it(`should decrease timer on tick`, () => {
    let timer = getTimer(30);
    assert.equal(timer.tick(), 29);
  });
  it(`should inform on finished`, () => {
    let timer = getTimer(2);
    assert.equal(timer.tick(), 1);
    assert.equal(timer.isFinished(), false);
    assert.equal(timer.tick(), 0);
    assert.equal(timer.isFinished(), true);
  });
  it(`should not allow set negative values`, () => {
    assert.throws(() => getTimer(-1), /should not allow set negative values/);
  });
});
