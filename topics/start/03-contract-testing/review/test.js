let chai = require('chai');
let expect = chai.expect;

describe('review', () => {
  it('returns three items in review', () => {
    let review = require('./review');

    expect(Object.keys(review()).length).to.equal(3);
  });
});
