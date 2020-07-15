const app = require('../app.js');

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('API', () => {
  const restaurantId = 'Oj0T2eStXvJMQnWUDwIg';
  const productId = 'crLOIlYJ0u0tRCuFU4TZ';

  it('GET /restaurants', (done) => {
    chai.request(app)
      .get('/api/restaurants')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.string;
        done();
      });
  });

  it('GET /restaurants/:id', (done) => {
    const expectedRestaurant = { "tags": "Sushi • Japanese", "bannerImage": "/images/sushiko-maxres.webp", "name": "Sushiko", "address": "64 Rue Mouffetard, 75005 Paris, France, Île-de-France 75005", "deliveryTime": 15, "deliveryFee": 4.45 };
    chai.request(app)
      .get(`/api/restaurants/${restaurantId}`)
      .end((err, res) => {
        const restaurant = res.body;
        expect(res).to.have.status(200);
        expect(restaurant).to.be.string;
        expect(restaurant).to.be.deep.equal(expectedRestaurant);
        done();
      });
  });

  it('GET /restaurants/:id/products', (done) => {
    chai.request(app)
      .get(`/api/restaurants/${restaurantId}/products`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.string;
        done();
      });
  });

  it('GET /restaurants/:restaurantId/products/:productId', (done) => {
    const expectedProduct = { "description": "Salade de choux et carotte", "title": "Salade de choux", "price": 2.99, "image": "/images/choux.webp"};
    chai.request(app)
      .get(`/api/restaurants/${restaurantId}/products/${productId}`)
      .end((err, res) => {
        const product = res.body;
        expect(res).to.have.status(200);
        expect(product).to.be.string;
        expect(product).to.be.deep.equal(expectedProduct);
        done();
      });
  });

});
