describe('App', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000', () => {
        })
    })

    it('Should have populated select', () => {
        const countrySelectOptions = cy.get('#country-selector option')
        countrySelectOptions.should('have.length', 251)
    })

    it('should show selected country on select change', () => {
        cy.get('#country-selector').select('France')
        cy.get('#selected-country').contains('France')
    })

    it('should add country to favourties on button click', () => {
        cy.get('#country-selector').select('France')
        cy.get('#favourite-button').click()
        cy.get('li').contains('France')
    })

})