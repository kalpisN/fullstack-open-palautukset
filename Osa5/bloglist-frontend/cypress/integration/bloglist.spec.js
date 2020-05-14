describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Kalle Käyttäjä',
            username: 'kkayttaja',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Login to application')
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('kkayttaja')
            cy.get('#password').type('salasana')
            cy.get('#login').click()

            cy.contains('Kalle Käyttäjä logged in')
        })
    })
    it('fails with wrong credentials', function () {
        cy.contains('login').click()
        cy.get('#username').type('kkayttaja')
        cy.get('#password').type('vaarasalasana')
        cy.get('#login').click()

        cy.get('.err')
            .should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')

        cy.should('not.contain', 'Kalle Käyttäjä logged in')


    })
    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'kkayttaja', password: 'salasana' })
        })


        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Blog')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.blogbycypress.com')
            cy.contains('create').click()

            cy.get('.success')
                .should('contain', 'a new blog Blog by cypress was added to bloglist')   
            
            cy.get('#blogs').should('contain', 'Blog')
                .and('contain', 'cypress')
        })
    })
})