
const createDomElement = (templateBlock) => {
  let screenWrapElement = document.querySelector(`.central`);
  screenWrapElement.innerHTML = ``;
  screenWrapElement.appendChild(templateBlock);
  return screenWrapElement;
};

export default createDomElement;
