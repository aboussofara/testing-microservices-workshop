let request = require('request-promise-native');

const { CATALOGUE_HOST = 'localhost' } = process.env;

module.exports = () => {

  return new Promise((resolve, reject) => {
    request({ uri: `http://${CATALOGUE_HOST}:9081/products`, json: true })
      .then((data) => {
        resolve(data);
    })
    .catch(reject);
  });
}
