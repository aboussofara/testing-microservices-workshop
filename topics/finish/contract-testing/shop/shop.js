let request = require('request-promise-native');

module.exports = () => {
  function addReviewsToEachProduct(producs, reviews) {
    return productsWithReviews = products.map((product) => {
      product.reviews = reviews[product.sku];
      return product;
    });
  }

  return new Promise((resolve, reject) => {
    Promise.all([
      request({ uri: 'http://catalogue:9081/products', json: true }),
      request({ uri: 'http://review:9082/reviews', json: true })
    ]).then((data) => {
      products = data[0];
      reviews = data[1];
      resolve(addReviewsToEachProduct(products, reviews));
    })
    .catch(reject);
  });
}
