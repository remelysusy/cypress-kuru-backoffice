
/// <reference types="Cypress" />
describe('Validação das ações de cadastro de empresa', () => {
  before(() => {
    cy.limparBanco()
    cy.visit('https://backoffice-test.kuru.com.br/')
  })
  it('Devo conseguir cancelar o cadastro de uma empresa no sistema ', () => {
    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()
    cy.get('.call-action-text.text-center.mb-3', { timeout: 10000 }).contains('Você não tem nenhuma empresa vinculada no seu usuário, deseja criar uma nova empresa')
    cy.get('#lnkCancelCreateCompany').click()
    cy.get('#btnLogin').should('contain', 'Logar')
  })

})

describe('Cadastrar e depois  logar em empresa', () => {
  before(() => {
    cy.prepararTeste(true)
  })

  it('Devo conseguir logar na empresa cadastrada no sistema quando o usuário e a senha estao corretas', () => {
    cy.get('#txtMail').type('test-user-rsi@rsitecnologia.com.br')
    cy.get('#txtPassword').type('123456')
    cy.get('#btnLogin').click()
    cy.get('#slcYourCompany', { timeout: 10000 }).should('be.visible')
    cy.get('.call-action-text').contains('Olá bem vindo de volta')
    cy.get('#slcYourCompany').select('cheff kuru')
    cy.get('.navbar-brand', { timeout: 10000 }).should('be.visible').contains('Início')
    cy.get('.dropdown-toggle.nav-link').click()
    cy.get('.dropdown-navbar > :nth-child(3)').click()


  })
})
