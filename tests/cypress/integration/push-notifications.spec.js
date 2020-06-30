describe('Push Notifications', () => {
    it('Granted', () => {
        cy.visit('http://localhost:3000').should(() => {
            cy.get('.notifications[data-status="granted"]').click({ force: true });
            expect(localStorage.getItem('notifications')).to.eq('granted');
            cy.get('#permission-icon').should('have.attr', 'src').and('eq', '/images/notifications_active.svg');
        });
    });

    it('Default', () => {
        cy.visit('http://localhost:3000').should(() => {
            cy.get('.notifications[data-status="default"]').click({ force: true });
            expect(localStorage.getItem('notifications')).to.eq('default');
            cy.get('#permission-icon').should('have.attr', 'src').and('eq', '/images/notifications.svg');
        });
    });

    it('Denied', () => {
        cy.visit('http://localhost:3000').should(() => {
            cy.get('.notifications[data-status="denied"]').click({ force: true })
            expect(localStorage.getItem('notifications')).to.eq('denied');
            cy.get('#permission-icon').should('have.attr', 'src').and('eq', '/images/notifications_off.svg');
        });
    });
});
