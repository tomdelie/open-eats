const restaurantsDOM = document.querySelectorAll('.restaurants > .restaurant');

const restaurants = Object.values(restaurantsDOM).map((restaurant, index) => {
    const restaurantInfos = {
        index: index,
        name: restaurant.dataset.name,
        tags: restaurant.dataset.tags,
        address: restaurant.dataset.address
    };

    return restaurantInfos;
});

const searchRestaurant = () => {
    const searchValues = document.getElementById('search-bar').value.split(',');
    const restaurantsToShow = new Array(restaurants.length).fill(0);

    if (searchValues.length && searchValues[0].length) {
        restaurants.forEach(restaurant => {
            Object.values(restaurant).forEach(value => {
                searchValues.forEach(searchValue => {
                    const regex = new RegExp(`(${searchValue.toString()})`, 'gi')
                    if (regex.test(value.toString())) {
                        restaurantsToShow[restaurant.index] = 1;
                    }
                });
            });
        });
        restaurantsToShow.forEach((value, index) => {
            restaurantsDOM[index].style.display = value ? 'block' : 'none';
        });
    } else {
        restaurantsDOM.forEach(restaurantDOM => restaurantDOM.style.display = 'block');
    }
};

document.getElementById('search-bar').addEventListener('keyup', searchRestaurant);