const SERVER_URL = `https://es.dump.academy/pixel-hunter/`;
const DEFAULT_NAME = `k0`;
const APP_ID = 526396;

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJsonFile = (res) => res.json();

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).then(checkStatus).then(toJsonFile);
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID} - ${name}`).then(checkStatus).then(toJsonFile);
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `aplication/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID} - ${name}`, requestSettings).then(checkStatus);
  }
}
