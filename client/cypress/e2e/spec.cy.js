describe("User CRUD", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });
    it("allows users to register", () => {
        cy.get(".form").contains("Cadastro");
        cy.get("#firstName").type("Murilo").should("have.value", "Murilo");
        cy.get("#lastName").type("Brito").should("have.value", "Brito");
        cy.get("#registerEmail")
            .type("murilo1@gmail.com")
            .should("have.value", "murilo1@gmail.com");
        cy.get("#cpf").type("00100200304").should("have.value", "00100200304");
        cy.get("#genre").select("feminino").should("have.value", "feminino");
        cy.get("#birthDate")
            .type("1999-12-31")
            .should("have.value", "1999-12-31");
        cy.get("#phoneNumber")
            .type("00000000000")
            .should("have.value", "00000000000");
        cy.get("#registerPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#confirmPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#registerBtn").click();
        cy.get(".RegisterSuccess");
    });
    it("allows users to login", () => {
        cy.get(".form").contains("login");
        cy.get("#loginEmail")
            .type("murilo1@gmail.com")
            .should("have.value", "murilo1@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#loginBtn").click();
    });
    it("allows users to update the profile", () => {
        // Login
        cy.get(".form").contains("login");
        cy.get("#loginEmail")
            .type("murilo1@gmail.com")
            .should("have.value", "murilo1@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#loginBtn").click();
        // Update
        cy.wait(2000);
        cy.get(".form").contains("Dados cadastrais");
        cy.get("#firstName")
            .clear()
            .type("Murebas")
            .should("have.value", "Murebas");
        cy.get("#lastName")
            .clear()
            .type("Moisés")
            .should("have.value", "Moisés");
        cy.get("#registerEmail")
            .clear()
            .type("lilobmoises@gmail.com")
            .should("have.value", "lilobmoises@gmail.com");
        cy.get("#genre").select("feminino").should("have.value", "feminino");
        cy.get("#birthDate")
            .clear()
            .type("1998-12-31")
            .should("have.value", "1998-12-31");
        cy.get("#phoneNumber")
            .clear()
            .type("00000000001")
            .should("have.value", "00000000001");
        cy.get("#updateUser").click();
        cy.get(".UpdateSuccess");
    });
    it("allows users to update one field", () => {
        // Login
        cy.get(".form").contains("login");
        cy.get("#loginEmail")
            .type("lilobmoises@gmail.com")
            .should("have.value", "lilobmoises@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#loginBtn").click();
        cy.wait(2000);
        // Update
        cy.get(".form").contains("Dados cadastrais");
        cy.get("#firstName")
            .clear()
            .type("Murebas Lilo")
            .should("have.value", "Murebas Lilo");
        cy.get("#updateUser").click();
        cy.get(".UpdateSuccess");
    });
    it("allows users to update the password", () => {
        // Login
        cy.get(".form").contains("login");
        cy.get("#loginEmail")
            .type("lilobmoises@gmail.com")
            .should("have.value", "lilobmoises@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#loginBtn").click();
        cy.wait(2000);
        // Update
        cy.get(".form").contains("Dados cadastrais");
        cy.get("#updatePassword").click();
        cy.get(".form").contains("Alterar Senha");
        cy.get("#registerPassword")
            .type("Senha#12345")
            .should("have.value", "Senha#12345");
        cy.get("#confirmPassword")
            .type("Senha#12345")
            .should("have.value", "Senha#12345");
        cy.get("#submitPassword").click();
        cy.get(".UpdateSuccess");
        cy.wait(5500);
    });
    it("allows users to delete their account", () => {
        // Login
        cy.get(".form").contains("login");
        cy.get("#loginEmail")
            .type("lilobmoises@gmail.com")
            .should("have.value", "lilobmoises@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#12345")
            .should("have.value", "Senha#12345");
        cy.get("#loginBtn").click();
        cy.wait(2000);
        // Delete
        cy.get(".form").contains("Dados cadastrais");
        cy.get("#deleteUser").click();
        cy.wait(1000);
        cy.get(".react-confirm-alert-body");
        cy.wait(1000);
        cy.contains("Yes").click();
        cy.wait(1000);
    });
    it("validate email", () => {
        cy.get(".form").contains("Cadastro");
        cy.get("#firstName").type("Murilo").should("have.value", "Murilo");
        cy.get("#lastName").type("Brito").should("have.value", "Brito");
        cy.get("#registerEmail")
            .type("@gmail.com")
            .should("have.value", "@gmail.com");
        cy.get("#cpf").type("00100200304").should("have.value", "00100200304");
        cy.get("#genre").select("feminino").should("have.value", "feminino");
        cy.get("#birthDate")
            .type("1999-12-31")
            .should("have.value", "1999-12-31");
        cy.get("#phoneNumber")
            .type("00000000000")
            .should("have.value", "00000000000");
        cy.get("#registerPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#confirmPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#registerBtn").click();

        cy.get(".RegisterError").contains(
            "The email address informed by the user is invalid."
        );
    });
    it("validate login", () => {
        cy.get(".form").contains("login");
        cy.get("#loginEmail")
            .type("@gmail.com")
            .should("have.value", "@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#12345")
            .should("have.value", "Senha#12345");
        cy.get("#loginBtn").click();
        cy.get(".LoginError").contains("Não foi possível realizar o login!");
    });
    it("validate update", () => {
        cy.get(".form").contains("login");
        cy.get("#loginEmail")
            .type("murebas2@gmail.com")
            .should("have.value", "murebas2@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#loginBtn").click();
        cy.get(".form").contains("Dados cadastrais");
        cy.get("#registerEmail")
            .clear()
            .type("murebas@gmail.com")
            .should("have.value", "murebas@gmail.com");
        cy.get("#updateUser").click();
        cy.get(".UpdateError");
    });
});

// describe("User CRUD - Error", () => {

// });
