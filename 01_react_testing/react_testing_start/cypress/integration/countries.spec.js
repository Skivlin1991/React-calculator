describe('countries', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('should have populated the select', () => {
        const countrySelectOptions = cy.get('#country-selector option')
        countrySelectOptions.should('have.length', 251);
    })

    it('should show selected country onSelect change', () => {
        cy.get("#country-selector").select("France")
        cy.get('#selected-country').contains('France')
    })

    it('should add country to favourites on button click', () => {
        cy.get('#')
    })
})