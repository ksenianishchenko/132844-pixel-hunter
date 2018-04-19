export const screenWrapElement = document.querySelector(`.central`);
export const createDomElement = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = `${template}`;
  return outer;
};

export const changeScreen = (element) => {
  screenWrapElement.innerHTML = ``;
  screenWrapElement.appendChild(element);
  return screenWrapElement;
};

export const renderBlock = (container, template) => {
  container.innerHTML = `${template}`;
};
