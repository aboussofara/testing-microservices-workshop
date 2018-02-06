let request = require('request-promise-native');

const { CATALOGUE_HOST = 'localhost' } = process.env;

module.exports = () => {

  return new Promise((resolve, reject) => {
    request({ uri: `http://${CATALOGUE_HOST}:9081/products`, json: true })
      .then((data) => {
        resolve(data.sort((first, second) => {
          if (first.title < second.title)
            return -1;
          if (first.title > second.title)
            return 1;
          return 0;
        }));
    })
    .catch(reject);
  });
}
