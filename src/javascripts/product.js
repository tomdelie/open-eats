const handleBookmark = (event) => {
    const product = event.target.closest('.product');
    const { productId, restaurantId, status } = product.dataset;

    if (status === 'true') {
        event.target.src = '/images/star.svg';
        fetch(`/favoris/${productId}`, {
            method: 'DELETE',
        }).then(() => {
            product.dataset.status = false;
        });
    } else {
        event.target.src = '/images/star-checked.svg';
        fetch('/favoris', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ restaurantId: restaurantId, productId: productId, status: status })
        }).then(() => {
            product.dataset.status = true;
        });
    }
};

Object.values(document.getElementsByClassName('bookmark')).forEach(bookmarkButton => {
    bookmarkButton.addEventListener('click', handleBookmark);
});