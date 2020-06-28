describe('Make an order', () => {
    it('should be successful', () => {
        cy.visit('http://localhost:3000');
        cy.get('a[href="/connexion"]').click();
        cy.get('#email').type('cypress@openeats.com');
        cy.get('#password').type('cypress');
        cy.get('#submit-sign-in').click();
        cy.get('.restaurant[data-name="Sushiko"]').click();
        cy.get('.product[data-name="Salade de choux"]').click();
        cy.get('#order-button > button').click();
        cy.get('a[href="/commandes"]').click({ force: true });
        const orderDate = Number((Date.now()/1000).toFixed(0));

        cy.get('.orders > .order').each((order, index) => {
            if (index === 0) {
                const orderDateDOM = order.data().orderDate;
                expect(orderDate).to.be.closeTo(orderDateDOM, 15);
                cy.get(`.order[data-order-date="${orderDateDOM}"] .order-items`).its('length').should('eq', 1);
                cy.get(`.order[data-order-date="${orderDateDOM}"] #total-price`).should('have.text', '2.99€');
            }
        });

        cy.get('a[href="/deconnexion"]').click({ force: true });
    });
});
