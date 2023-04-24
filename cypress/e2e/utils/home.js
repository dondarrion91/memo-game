export const startGame = (cy, expect) => {
  cy.visit("/");

  cy.get("#name").should(($el) => {
    expect($el).to.be.visible;
  });

  cy.get("#name").type("JULIAN");

  cy.get("#start-button").should(($el) => {
    expect($el).to.be.visible;
  });

  cy.get("#start-button").click();

  cy.get(".header-title")
    .eq(0)
    .should(($el) => {
      expect($el).to.be.visible;
    });
};
