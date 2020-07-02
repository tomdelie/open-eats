const RandomColor = require('./RandomColor.js');

const randomColor = new RandomColor();
document.getElementById('banner').classList.add(randomColor.randomClass(randomColor.randomNumber()));
