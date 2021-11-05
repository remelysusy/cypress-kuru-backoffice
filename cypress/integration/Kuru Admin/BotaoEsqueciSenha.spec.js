/// <reference types="Cypress" />
describe('Validação das ações da Tela Esqueci Senha', () => {
    before(() => {
        cy.prepararTeste(true)
    })
    beforeEach(() => {
        cy.visit('https://backoffice-test.kuru.com.br/')
    })
    it('Devo verificar se o e-mail inserido na tela esqueci senha é cadastrado', () => {
        cy.get('#lnkForgotPassword').click()
        cy.get('#btnForgotPassword', { timeout: 10000 }).should('be.visible')
        cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
        cy.get('#txtMail').should('have.value', 'test-user-rsi@rsitecnologia.com.br')
        cy.get('#btnForgotPassword').click()
        cy.get('#toast-container div', { timeout: 100000 }).should('be.visible').contains('Foi enviado o e-mail com as orientações para recuperar a sua senha')
    })

    it('Devo verificar se o e-mail inserido na tela esqueci senha é invalido', () => {
        cy.get('#lnkForgotPassword').click()
        cy.get('#btnForgotPassword', { timeout: 10000}).should('be.visible')
        cy.get('#txtMail').type('rsitecnologia.com.br')
        cy.get('#btnForgotPassword').click()
        cy.get('#toast-container div', { timeout: 10000 }).should('be.visible').contains('"E-mail" deve ser um e-mail válido')
    })

    it('Devo Consultar se o e-mail inserido  na tela esqueci senha não esta cadastrado no sistema', () => {
        cy.get('#lnkForgotPassword').click()
        cy.get('#btnForgotPassword', { timeout: 10000 }).should('be.visible')
        cy.get('#txtMail').type('kuru@rsitecnologia.com.br')
        cy.get('#txtMail').should('have.value', 'kuru@rsitecnologia.com.br')
        cy.get('#btnForgotPassword').click()
        cy.get('#toast-container div', { timeout: 10000 }).should('be.visible').contains('E-mail informado não encontrado')
    })


})