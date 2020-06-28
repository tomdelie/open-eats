describe('Search bar', () => {
    it('Find Sushiko restaurant by name', () => {
        cy.visit('http://localhost:3000');
        const searchValue = 'Sushiko';
        cy.get('#search-bar').type(searchValue);

        cy.get('.restaurants > .restaurant').each(restaurant => {
            if (restaurant.data().name === searchValue) {
                cy.wrap(restaurant).then((restaurant) => {
                    expect(Cypress.dom.isVisible(restaurant)).to.be.true;
                });
            } else {
                cy.wrap(restaurant).then((restaurant) => {
                    expect(Cypress.dom.isVisible(restaurant)).to.be.false;
                });
            }
        });
    });
    
    it('Find Sushiko restaurant by address', () => {
        cy.visit('http://localhost:3000');
        const searchValue = '64 Rue Mouffetard, 75005 Paris, France, Île-de-France 75005';
        cy.get('#search-bar').type(searchValue);

        cy.get('.restaurants > .restaurant').each(restaurant => {
            if (restaurant.data().address === searchValue) {
                cy.wrap(restaurant).then((restaurant) => {
                    expect(Cypress.dom.isVisible(restaurant)).to.be.true;
                });
            } else {
                cy.wrap(restaurant).then((restaurant) => {
                    expect(Cypress.dom.isVisible(restaurant)).to.be.false;
                });
            }
        });
    });
});
