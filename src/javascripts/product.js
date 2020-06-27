const handleBookmark = (event) => {
    const product = event.target.closest('.product');
    const { productId, restaurantId, status } = product.dataset;

    if (status === 'true') {
        fetch(`/favoris/${productId}`, {
            method: 'DELETE',
        }).then(() => {
            event.target.src = '/images/star.svg';
            product.dataset.status = false;
        });
    } else {
        fetch('/favoris', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ restaurantId: restaurantId, productId: productId, status: status })
        }).then(() => {
            event.target.src = '/images/star-checked.svg';
            product.dataset.status = true;
        });
    }
};

Object.values(document.getElementsByClassName('bookmark')).forEach(bookmarkButton => {
    bookmarkButton.addEventListener('click', handleBookmark);
});