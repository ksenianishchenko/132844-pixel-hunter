const template = (screenElementId) => {
  let screenContentTemplate = document.querySelector(`#${screenElementId}`).content;
  const screenElement = screenContentTemplate.cloneNode(true);
  return screenElement;
};
export {template};
