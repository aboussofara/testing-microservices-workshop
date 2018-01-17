let chai = require('chai');
let expect = chai.expect;

describe('hello world!', () => {
  it('sends hello world', () => {
    let hello = require('./hello');

    expect(hello()).to.equal('foo');
  });
});
