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
        const searchValue = '64 Rue Mouffetard';
        cy.get('#search-bar').type(searchValue);

        cy.get('.restaurants > .restaurant').each(restaurant => {
            if (restaurant.data().address.includes(searchValue)) {
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
