class RandomColor {
    randomNumber() {
        return Math.floor((Math.random() * 100) + 1);
    }

    randomClass(randomNumber) {
        if (randomNumber >= 0 && randomNumber <= 20) {
            return 'banner-green';
        }

        if (randomNumber >= 21 && randomNumber <= 40) {
            return 'banner-red';
        }

        if (randomNumber >= 41 && randomNumber <= 60) {
            return 'banner-pink';
        }

        if (randomNumber >= 61 && randomNumber <= 80) {
            return 'banner-purple';
        }

        if (randomNumber >= 81 && randomNumber <= 100) {
            return 'banner-yellow';
        }
    }
};

module.exports = RandomColor;
