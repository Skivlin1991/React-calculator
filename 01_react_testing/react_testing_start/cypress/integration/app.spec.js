describe('App', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('loads the app', () => {
        const counter = cy.get('h1');
        counter.should('contain', '0');
    })
})