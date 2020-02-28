

describe("App Test", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000");
    })
    it("simple", () => {

        expect(1).to.equals(1);
    })
    it("Navigate to App", () => {
        
        cy.contains("Home");
        cy.contains("Counter");
        cy.contains("Customers");
    })

    it("Navigate to counter", () => {

        cy.wait(2000);
        cy.contains("Counter").click();
        cy.url().should("include", "counter");
        cy.contains("THE COUNT:0");

        cy.wait(2000);
        cy.contains("Increment").click();
        cy.contains("THE COUNT:1");

        cy.wait(2000);
        cy.get("input[data-testid='ctr']").clear()
        cy.get("input[data-testid='ctr']").type("10");
        cy.contains("THE COUNT:10");

    })

})