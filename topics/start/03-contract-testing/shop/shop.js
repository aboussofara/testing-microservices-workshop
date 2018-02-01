let request = require('request-promise-native');

const { CATALOGUE_HOST = 'localhost', REVIEW_HOST = 'localhost' } = process.env;

module.exports = () => {
  function addReviewsToEachProduct(products, reviews) {
    return productsWithReviews = products.map((product) => {
      product.reviews = reviews[product.sku];
      return product;
    });
  }

  return new Promise((resolve, reject) => {
    Promise.all([
      request({ uri: `http://${CATALOGUE_HOST}:9081/products`, json: true }),
      request({ uri: `http://${REVIEW_HOST}:9082/review`, json: true })
    ]).then((data) => {
      products = data[0];
      reviews = data[1];
      resolve(addReviewsToEachProduct(products, reviews));
    })
    .catch(reject);
  });
}
