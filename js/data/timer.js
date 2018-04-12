export const getTimer = (seconds) => {
  if (seconds < 0) {
    throw new Error(`should not allow set negative values`);
  }
  const timer = {
    isFinished: () => seconds > 0 ? false : true,
    tick: () => {
      if (seconds > 0) {
        seconds -= 1;
      }
      return seconds;
    }
  };
  return timer;
};
