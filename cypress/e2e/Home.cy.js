/* eslint-disable cypress/no-unnecessary-waiting */
// https://docs.cypress.io/api/introduction/api.html
import { startGame } from "./utils/home";
import fixtures from "../fixtures/example.json";

describe("End 2 End Tests", () => {
  it("Should render the home page correctly", () => {
    cy.visit("/");
    cy.contains("h1", "MEMO GAME");
  });

  it("Should prevent the PLAY button from click it when the name is empty", () => {
    cy.visit("/");

    cy.get("#start-button")
      .should(($el) => {
        expect($el).to.be.visible;
      })
      .then(($button) => {
        expect($button).to.be.disabled;
      });
  });

  it("Should press the PLAY button and show the game view", () => {
    startGame(cy, expect);
  });

  it("Should start a game and show a congratulations modal with your name", () => {
    startGame(cy, expect);

    cy.get(".grid-1-1")
      .eq(0)
      .should(($el) => {
        expect($el).to.be.visible;
      });

    const { grids } = fixtures;
    const ALMOST_ONE_SEC = 800;
    const MODAL_SHOWN_TIMEOUT = 200;
    // I Test all the possible combinations to complete the game
    // Can improve
    for (const i of grids) {
      for (const j of grids) {
        cy.wait(MODAL_SHOWN_TIMEOUT);
        cy.get("#modal")
          .eq(0)
          .then(($el) => {
            if ($el.attr("class").split(" ").includes("show")) return;
            cy.get(`.${i}`).click();
            cy.wait(ALMOST_ONE_SEC);
            cy.get(`.${j}`).click();
          });
      }
    }

    cy.get("#modal > div > div > div.modal-body > p").should("be.visible");
    cy.contains("#modal > div > div > div.modal-body > p", "FELICITACIONES JULIAN!!!");
  });
});
