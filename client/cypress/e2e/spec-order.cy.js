describe("Place an order", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });
    it("Allows user to place an order", () => {
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

        // Add product to cart
        cy.visit("http://localhost:3000");
        cy.get("#product-2-image").click();
        cy.get("#productProfile-color-0").click();
        cy.get("#productProfile-size-0").click();
        cy.get(".productProfile-buyBtn").click();

        // Checkout
        cy.get("#cart-icon").click();
        cy.get(".cart-next_btn").click();
        cy.get(".addressCard-radioBtn").contains("Rua Flores Amarelas").click();
        cy.get(".cart-next_btn").click();
        cy.get(".cardCheckbox").contains("0001000200030004").click();
        cy.get("#valueToPay").type("200");
        cy.get(".cart-next_btn").click();
    });
    it("Allows admin to update an order", () => {
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

        // Update order status
        cy.visit("http://localhost:3000/admin");
        cy.get("#link-pedidos").click();
        cy.get(".ri-pencil-fill").last().click();
        cy.get("#orderStatus").select("Enviado");
        cy.get("#confirmOrderUpdate").click();
    });
    it("Allows user to verify the order status", () => {
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
        cy.get("#link-pedidos").click();
        cy.get(".column-order-status").last().contains("Enviado");
    });
});
