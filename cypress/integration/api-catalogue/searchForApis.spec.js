import { screenSizes } from "../../support/screenSizes";

describe("Search for APIs", function() {
    beforeEach(function () {
        cy.login();
        cy.visit("/api-catalogue");
    });

    screenSizes.forEach((screenSize) => {

        it(`Shows the search bar on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            cy.get("input#search").should("be.visible");
        });

        it(`Sets the search label and placeholder to 'Search for an API' then 'Search again' on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            cy.get("#search").should('have.attr', 'placeholder', 'Search for an API...');
            cy.get("#search").type("test");
            cy.get(".lbh-search-box__action").click();
            cy.get("#search").should('have.attr', 'placeholder', 'Search again...');
        });
    
        it(`Shows an error message when no results are returned on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            const query = "query for api that doesn't exist";
            cy.intercept('/specs*', { totalCount: 0 });
            cy.visit(`/api-catalogue?search=${query}`);
            cy.get(".lbh-error-summary.secondary").should('be.visible');
        });

        it(`Shows an error message when the API returns an error on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            const query = "query that returns an API error";
            cy.intercept('/specs*', { statusCode: 500, body: "Server Error" });
            cy.visit(`/api-catalogue?search=${query}`);
            cy.get(".lbh-error-summary").should('be.visible');
        });
    
    })

    it(`Adds the form input as a query parameter`, function() {
        const query = "test"
        cy.get("#search").type(query);
        cy.get(".lbh-search-box__action").click();
        cy.url().should('include', `search=${query}`);
    });

    it(`Queries the SwaggerHub API with the form response`, function() {
        cy.intercept('/specs*').as('getApiDefinitions');
        const query = "Tenure"
        cy.get("#search").type(query);
        cy.get(".lbh-search-box__action").click();
        cy.wait('@getApiDefinitions').its('request.url').should('include', `query=${query}`);
    });

    it(`Queries the SwaggerHub API with the query from the url`, function() {
        cy.intercept('/specs*').as('getApiDefinitions');
        const query = "queryString";
        cy.visit(`/api-catalogue?search=${query}`)
        cy.wait('@getApiDefinitions').its('request.url').should('include', `query=${query}`);
    });

    it(`Shows the search query in the heading & breadcrumbs`, function() {
        const query = "someQuery";
        cy.visit(`/api-catalogue?search=${query}`);
        cy.get(".govuk-breadcrumbs__list-item").should("contain", query);
        cy.get("h1").should("contain", query);
    });

    it(`Shows a special character search query in the heading & breadcrumbs`, function() {
        const query = "s@me' qu£ry";
        cy.get("#search").type(query);
        cy.get(".lbh-search-box__action").click();
        cy.get(".govuk-breadcrumbs__list-item").should("contain", query);
        cy.get("h1").should("contain", query);
    });

});