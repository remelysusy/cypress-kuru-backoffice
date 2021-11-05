// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
Cypress.Commands.add('prepararTeste', (deslogar) => {//limpa o banco, cadastra a empresa e depois desloga
    cy.request('https://backend-test.kuru.com.br/v1/public/test-prepare')

    cy.visit('https://backoffice-test.kuru.com.br/')

    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()

    cy.get('.call-action-text.text-center.mb-3', { timeout: 3000 }).contains('Você não tem nenhuma empresa vinculada no seu usuário, deseja criar uma nova empresa')
    cy.get('#txtCompanyName').type('cheff kuru')
    cy.get('#txtSegment').type('Comida')
    cy.get('#slcState').select('Mato Grosso')
    cy.get('#slcCity').select('Cuiabá')
    cy.get('#btnCreateCompany').click()

    cy.get('.toast-message', { timeout: 100000 }).should('be.visible').contains('Empresa registrada com sucesso, acessando...')
    cy.get('.navbar-brand', { timeout: 100000 }).should('be.visible').contains('Início')

    if (deslogar) {
        cy.get('.dropdown-toggle.nav-link').click()
        cy.get('.dropdown-navbar > :nth-child(3)').click()
        cy.reload()
    }
})
Cypress.Commands.add('limparBanco', () => {// apenas limpa o banco
    cy.request('https://backend-test.kuru.com.br/v1/public/test-prepare')
})

Cypress.Commands.add('deslogar', () => {// apenas desloga
        cy.get('.dropdown-toggle.nav-link').click()
        cy.get('.dropdown-navbar > :nth-child(3)').click()
        cy.reload()
    
})
