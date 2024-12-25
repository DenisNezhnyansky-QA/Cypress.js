import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки востановить пароль
     });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // есть крестик и он виден пользователю
     });

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login); // ввели верный логин 
         cy.get(main_page.password).type(data.password); // ввели верный пароль
         cy.get(main_page.login_button).click(); // нажал войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что авт. прошла успешно
         cy.get(result_page.title).should('be.visible'); // текст виден пользователю
     })     

    it('Проверка восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click() // нажали кнопку забыли пароль
        cy.get(recovery_password_page.email).type(data.login) // ввели email
        cy.get(recovery_password_page.send_button).click() // нажал на кнопку отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю, что авт. прошла успешно
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Негативный кейс авторизации - Неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввели верный логин 
        cy.get(main_page.password).type('iLoveqastudio'); // ввели неверный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что авт. прошла успешно
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Негативный кейс авторизации - Неправильный логин', function () {
        cy.get(main_page.email).type('denis@dolnikov.ru'); // ввели неверный логин 
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что авт. прошла успешно
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Негативный кейс авторизации - нет @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // ввели неверный логин 
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю, что авт. прошла успешно
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Приведение к строчных буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели строчные буквы
        cy.get(main_page.password).type(data.password); // ввели верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что авт. прошла успешно
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })
})