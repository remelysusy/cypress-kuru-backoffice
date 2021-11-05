/// <reference types="cypress" />

const loginPageObject = require("./login.PageObject")

class LoginPage {
    visitarPagina() {
        cy.visit(Cypress.config().baseUrl)
    }

    escreverUsuario(texto) {
        cy.get(loginPageObject.inputUsuario).type(texto)
    }

    escreverSenha(texto) {
        cy.get(loginPageObject.inputSenha).type(texto)
    }
    clicarNoBotaoLogin() {
        cy.get(loginPageObject.buttonEntrar).click()
    }

    limparCampoUsuario() {
        cy.get(loginPageObject.inputUsuario).clear()
    }

    limparCampoSenha() {
        cy.get(loginPageObject.inputSenha).clear()
    }
    mensagemCamposVazios() {
        cy.get(loginPageObject.mensagemDeValidacao, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.mensagemDeValidacao).contains('"Usuário" não pode estar vazio')
    }

    mensagemCampoSenhaVazio() {
        cy.get(loginPageObject.mensagemDeValidacao, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.mensagemDeValidacao).contains('"Senha" não pode estar vazio')
    }

    mensagemUsuarioObrigatorio() {
        cy.get(loginPageObject.mensagemDeValidacao, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.mensagemDeValidacao).contains('"Usuário" é obrigatório')
    }

    mensagemSenhaObrigatoria() {
        cy.get(loginPageObject.mensagemDeValidacao, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.mensagemDeValidacao).contains('"Senha" é obrigatório')
    }

    mensagemUsuarioDeveSerEmailValido() {
        cy.get(loginPageObject.mensagemDeValidacao, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.mensagemDeValidacao).contains('"Usuário" deve ser um e-mail válido')
    }

    mensagemSenhaOuUsuarioInvalido() {
        cy.get(loginPageObject.mensagemDeValidacao, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.mensagemDeValidacao).contains('Senha ou Usuário inválido')
    }

    exibiTelaInicial() {
        cy.get(loginPageObject.telaInicial, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.telaInicial).contains('Início')
    }

    estaNoModalDeSelecionarEmpresa() {
        cy.get(loginPageObject.selectEmpresa, { timeout: 10000 }).should('be.visible')
        cy.get(loginPageObject.selectEmpresa).contains('Olá bem vindo de volta')
    }

    selecionarEmpresa(empresa) {
        cy.get(loginPageObject.opcaoEmpresa).select(empresa)
    }


}

module.exports = new LoginPage()