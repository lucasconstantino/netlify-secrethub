it("should show page", () => {
  cy.visit("/");
  cy.contains("Testing secrethub");
});
