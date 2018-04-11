export const getTimer = (seconds) => {
  const timer = {
    isFinished: () => {
      if (seconds > 0) {
        return false;
      }
      return true;
    },
    tick: () => {
      if (seconds > 0) {
        seconds -= 1;
      } else {
        seconds = 0;
      }
      return seconds;
    }
  };
  return timer;
};
