describe("Exchange Flow", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("http://localhost:3000");
    });
    it("Allows user to place an exchange", () => {
        // User login
        cy.visit("http://localhost:3000/login");
        cy.get("#loginEmail")
            .type("ana@gmail.com")
            .should("have.value", "ana@gmail.com");
        cy.get("#loginPassword")
            .type("12345678")
            .should("have.value", "12345678");
        cy.get("#loginBtn").click();
        cy.get(".user-name").contains("ana");

        // Place an exchange
        cy.get("#link-trocas").click();
        cy.get("#new-exchange").click();
        cy.get(".select-exchange").last().click();
        cy.get("#product-0").click();
        cy.get("#description").type("O tamanho escolhido não serviu.");
        cy.get("#newExchange").click();
    });
    it("Allows admin to update an exchange", () => {
        // User login
        cy.visit("http://localhost:3000/login");
        cy.get("#loginEmail")
            .type("jean2@gmail.com")
            .should("have.value", "jean2@gmail.com");
        cy.get("#loginPassword")
            .type("12345678")
            .should("have.value", "12345678");
        cy.get("#loginBtn").click();
        cy.get(".user-name").contains("jean");

        // Update exchange status
        cy.visit("http://localhost:3000/admin");
        cy.get("#link-trocas").click();
        cy.get(".ri-pencil-fill").last().click();
        cy.get("#exchangeStatus").select("Cupom gerado");
        cy.get("#confirmExchangeUpdate").click();
        cy.get("#newCoupon").click();
    });
    it("Allows user to verify the exchange status", () => {
        // User login
        cy.visit("http://localhost:3000/login");
        cy.get("#loginEmail")
            .type("ana@gmail.com")
            .should("have.value", "ana@gmail.com");
        cy.get("#loginPassword")
            .type("12345678")
            .should("have.value", "12345678");
        cy.get("#loginBtn").click();
        cy.get(".user-name").contains("ana");

        // Check exchange status
        cy.get("#link-trocas").click();
        cy.get(".column-exchange-status").last().contains("Cupom gerado");
    });
    it("Allows user to use a cupom", () => {
        // User login
        cy.visit("http://localhost:3000/login");
        cy.get("#loginEmail")
            .type("ana@gmail.com")
            .should("have.value", "ana@gmail.com");
        cy.get("#loginPassword")
            .type("12345678")
            .should("have.value", "12345678");
        cy.get("#loginBtn").click();
        cy.get(".user-name").contains("ana");

        // Copy coupon code
        cy.get("#link-cupons").click();
        let code;
        cy.get(".coupon-code")
            .last()
            .then(($code) => {
                code = $code.text();
                cy.log(code);
                // Place an order
                cy.visit("http://localhost:3000");
                cy.get("#product-2-image").click();
                cy.get("#productProfile-color-0").click();
                cy.get("#productProfile-size-0").click();
                cy.get(".productProfile-buyBtn").click();
                cy.get("#cart-icon").click();

                // Apply coupon
                cy.get("#coupon").type(code);
                cy.get("#apply-coupon").click();
            });

        // Checkout
        cy.get(".cart-next_btn").click();
        cy.get(".addressCard-radioBtn").contains("Rua Flores Amarelas").click();
        cy.get(".cart-next_btn").click();
        cy.get(".cardCheckbox").contains("0001000200030004").click();
        cy.get("#valueToPay").type("0");
        cy.get(".cart-next_btn").click();
    });
});
