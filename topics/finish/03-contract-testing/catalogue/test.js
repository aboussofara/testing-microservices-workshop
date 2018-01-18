let chai = require('chai');
let expect = chai.expect;

describe('catalogue', () => {
  it('returns three items in catalogue', () => {
    let catalogue = require('./catalogue');

    expect(catalogue().length).to.equal(3);
  });
});
