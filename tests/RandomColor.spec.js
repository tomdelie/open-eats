const { expect } = require('chai');
const RandomColor = require('../src/javascripts/RandomColor.js');

describe('RandomColor class', () => {
  const randomColor = new RandomColor();

  it('randomNumber()', () => {
    expect(randomColor.randomNumber()).to.be.a('number');
  });

  it('randomClass(10)', () => {
    expect(randomColor.randomClass(10)).to.be.equal('banner-green');
  });

  it('randomClass(30)', () => {
    expect(randomColor.randomClass(30)).to.be.equal('banner-red');
  });

  it('randomClass(50)', () => {
    expect(randomColor.randomClass(50)).to.be.equal('banner-pink');
  });

  it('randomClass(70)', () => {
    expect(randomColor.randomClass(70)).to.be.equal('banner-purple');
  });

  it('randomClass(90)', () => {
    expect(randomColor.randomClass(90)).to.be.equal('banner-yellow');
  });
});
