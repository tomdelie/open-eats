const { areNotificationsAllowed } = require('./notifications.js');

const products = document.getElementsByClassName('product');
const orderButton = document.getElementById('order-button');
const orderPrice = document.getElementById('order-price');
let price = 0;
let items = []; 

const displayOrderButton = () => {
    let selections = 0;
    price = 0;
    items = [];
    Object.values(products).forEach(product => {
        const { selected, price: productPrice, name: productName, restaurantId } = product.dataset;
        if (selected === 'true') {
            selections++;
            price += parseFloat(productPrice);
            items.push({ price: productPrice, name: productName });
        }
    });

    if (selections) {
        orderButton.style.display = 'block';
        orderPrice.textContent = `${price.toFixed(2)}€`;
    } else {
        orderButton.style.display = 'none';
    }
};

const handleSelection = (event) => {
    if (!event.target.classList.contains('bookmark')) {
        const product = event.target.closest('.product');
        if (product.dataset.selected === 'false') {
            product.dataset.selected = 'true';
            product.style.border = '2px solid #48bb78';
            product.style.backgroundColor = '#c6f6d5';
        } else {
            product.dataset.selected = 'false';
            product.style.border = '';
            product.style.backgroundColor = '';
        }
    
        displayOrderButton();
    }
};

const unselectAll = () => {
    Object.values(products).forEach(product => { 
        product.dataset.selected = 'false'; 
        product.style.border = '';
        product.style.backgroundColor = '';
        displayOrderButton();
    });
};

const orderNotification = () => {
    if (areNotificationsAllowed()) {
        navigator.serviceWorker.getRegistration().then(reg => {
            let options = {
                body: 'Notre meilleur coursier multi-médaillé aux JO de Tokyo vous livrera dans 10 minutes.',
            }
            reg.showNotification('Vous avez commandé un repas !', options);
        });
    }
};

const handleOrder = () => {
    fetch('/commande', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: price, items: items })
    }).then(() => {
        unselectAll();
        orderNotification();
    });
};

// LISTENERS ------------
Object.values(products).forEach(product => product.addEventListener('click', handleSelection) );
orderButton.addEventListener('click', handleOrder);
