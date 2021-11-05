/// <reference types="Cypress" />

describe('Suite de tela de LoginAPIs', () => {
  before(() => {
    cy.request('https://backend-test.kuru.com.br/v1/public/test-prepare')
  })
  describe('Deve efeutar o login corretamente se usuário e senha estivem certo', () => {
    it('Login correto', () => {
      cy.request('POST', 'https://backend-test.kuru.com.br/v1/user/login', {
        mail: 'test-user-rsi@rsitecnologia.com.br',
        password: '123456'
      }).then(resposta_api => {
        expect(resposta_api.status).to.be.eq(200)
        expect(resposta_api.body.user.name).to.be.eq('Test User RSI')
      })
    })
  })
  describe('Não deve logar', () => {
    it('Quando o usuário e senha estiverem errados', () => {
      cy.request({
        url: 'https://backend-test.kuru.com.br/v1/user/login',
        method: 'post',
        body: {
          mail: 'test-user-rsi@rsitecnologia.com.br',
          password: '13123123123'
        },
        failOnStatusCode: false
      }).then(resposta_api => {
        expect(resposta_api.status).to.be.eq(404)
        expect(resposta_api.body.message).to.be.eq('Senha ou Usuário inválido')
      })
    })
    it('Quando o usuário estiver preenchido e a senha é vazia ', () => {
      cy.request({
        url: 'https://backend-test.kuru.com.br/v1/user/login',
        method: 'post',
        body: {
          mail: 'test-user-rsi@rsitecnologia.com.br',
          password: ''
        },
        failOnStatusCode: false
      }).then(resposta_api => {
        expect(resposta_api.status).to.be.eq(422)
        expect(resposta_api.body.error).to.be.eq('"Senha" não pode estar vazio')
      })
    })
  })
})