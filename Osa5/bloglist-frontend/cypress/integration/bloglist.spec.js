describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.createUser({
            name: 'Kalle Käyttäjä',
            username: 'kkayttaja',
            password: 'salasana'
        })
        
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
            cy.createBlog({ title: 'testiblogi', author: 'testaaja', url: 'www.testiblogi.fi' })
            cy.createBlog({ title: 'toinen', author: 'bloggari', url: 'www.toinen.fi'})
            cy.createBlog({ title: 'kolmas', author: 'blogaaja', url: 'www.kolmas.fi'})
        })


        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('new blog')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.blogbycypress.com')
            cy.contains('create').click()  
            
            cy.get('.success').should('contain', 'new blog by cypress was added to bloglist')
            cy.get('#blogs').should('contain', 'new blog')
                .and('contain', 'cypress')
        })

        it('A blog can be liked', function () {

            cy.contains('testiblogi')
                .contains('view')
                .click()

            cy.contains('like')
                .click()

            cy.contains('likes')
                .contains(1)
        })

        it('a blog can be deleted by the user who created the blog', function() {
            cy.get('#blogs')
                .contains('testiblogi')
                .contains('view')
                .click()
            cy.contains('remove')
                .click()
        })

        it('a blog can not be deleted by a user who did not create it', function() {
            cy.createUser({ name: 'Uusi käyttäjä', username: 'uusikayttaja', password: 'salasana' })

            cy.get('#logout').click()
            cy.login({ username: 'uusikayttaja', password: 'salasana'})

            cy.contains('testiblogi')
                .parent().find('button').click()
            cy.contains('Title: testiblogi')
                .should('not.contain', 'remove')
        })

        it('a blog with most likes is the first item of the bloglist', function() {
            cy.contains('toinen')
                .parent().find('button').click()
            cy.contains('like').click()
                .click()
                .click()
            cy.contains('hide').click()
            
            cy.contains('kolmas')
                .parent().find('button').click()
            cy.contains('like').click().click()

            cy.get('#blog').first().should('contain', 'toinen')
                .next().should('contain', 'kolmas')        



        })
    })
})