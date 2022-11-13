describe("Make an order", () => {
    beforeEach(() => {
        cy.task("defaults:db");

        cy.visit("http://localhost:3000");
    });
    it("Allows user to login", () => {
        cy.visit("http://localhost:3000/login");

        cy.get("#loginEmail")
            .type("ana@gmail.com")
            .should("have.value", "ana@gmail.com");
        cy.get("#loginPassword")
            .type("Senha#1234")
            .should("have.value", "Senha#1234");
        cy.get("#loginBtn").click();
    });
    it("Allows user to make an order", () => {
        cy.visit("http://localhost:3000");

        cy.get("#product-2-image").click();
        cy.get("#productProfile-color-0").click();
        cy.get("#productProfile-size-0").click();
        cy.get(".productProfile-buyBtn").click();
        cy.get("#cart-icon").click();
        cy.get("#select-address_btn").click();
        cy.get(".addressCard-radioBtn").contains("Rua Flores Amarelas").click();
        cy.get("#select-payment_btn").click();
        cy.get(".cardCheckbox").contains("0001000200030004").click();
        cy.get("#cardCheckbox").type("200");
        cy.get("#finish-order_btn").click();
    });
});
