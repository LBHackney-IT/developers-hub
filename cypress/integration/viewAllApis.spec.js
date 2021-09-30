import { screenSizes } from "../support/screenSizes";

describe("View API Catalogue page", () => {

    screenSizes.forEach((screenSize) => {

        it(`View title on ${screenSize} screen`, () => {
            cy.intercept('/specs*').as('getApiDefinitions')
            cy.visit("/api-catalogue");
            cy.wait("@getApiDefinitions");
            cy.contains("API Catalogue").should('be.visible');
        });
        
        it(`View 5 APIs by default on ${screenSize} screen`, () => {
            const expectedCount = 5;
            cy.get('ul#apisList').get('li.apiPreview').should('have.length', expectedCount);
        });

        it(`View error response if API error on ${screenSize} screen`, () => {
            cy.intercept('GET', '/specs*', { statusCode: 500 });
            cy.reload();
            cy.get(".lbh-error-summary").should('be.visible');
        });
    })
    
});

describe('All APIs Pagination', () => {

    beforeEach(function () {
        cy.intercept('/specs*').as('getApiDefinitions')
    })

    const visitLastPageIfPossible = () => {
        // iterate recursively until the "Next" link is disabled
        cy.get(".lbh-simple-pagination__link--next").then(($next) => {
        if ($next.hasClass('disabled')) { return } // we are on the last page
        
        cy.wait(500); // just for clarity
        cy.get(".lbh-simple-pagination__link--next").click();
        
        cy.wait("@getApiDefinitions");
        visitLastPageIfPossible();
        })
    }
    
    it('View the first page', () => {
        cy.visit("/api-catalogue");
        cy.wait("@getApiDefinitions");
        cy.get(".lbh-simple-pagination__link--previous").should('have.class', 'disabled');
               
    });

    it('View the last page', () => {
        visitLastPageIfPossible();
        cy.get(".lbh-simple-pagination__link--next").should('have.class', 'disabled');
    });
});

describe("Filter APIs", () => {

    beforeEach(function () {
        // Stub API response
        cy.fixture("allApis").then((allApis) => {
            this.apiData = allApis.apis[0];
            cy.intercept('GET', '/specs*', allApis).as("getApis");
        });
    });

    it("View all APIs by default", () => {
        cy.visit("/api-catalogue");
        cy.wait('@getApis').its('request.url').should('include', 'state=ALL');
        cy.get("#filterApis-0").should("be.checked");
    });

    it("View active APIs", () => {
        cy.get("#filterApis-1").check();
        cy.wait('@getApis').its('request.url').should('include', 'state=PUBLISHED');
    });

    it("View inactive APIs", () => {
        cy.get("#filterApis-2").check();
        cy.wait('@getApis').its('request.url').should('include', 'state=UNPUBLISHED');
    });

    it("Click on radio labels to select an API filter", () => {
       cy.get(".govuk-radios__label").contains("Active APIs").click();
       cy.wait('@getApis').its('request.url').should('include', 'state=PUBLISHED');
    });
});

describe("Pagination + Filters", () => {
    it("When switching filters, pagination is reset", () => {
        cy.intercept('/specs*').as('getApiDefinitions');
        cy.visit("/api-catalogue");

        cy.get('.lbh-simple-pagination__title.next').should($nextPage => {
            expect($nextPage.text()).to.contain("2"); // on page 1
        });
        cy.get(".lbh-simple-pagination__link--next").click();
        cy.wait("@getApiDefinitions");
        cy.get('.lbh-simple-pagination__title.next').should($nextPage => {
            expect($nextPage.text()).to.contain("3"); // on page 2
        });

        cy.get("#filterApis-2").check();
        cy.wait("@getApiDefinitions");
        
        cy.get('.lbh-simple-pagination__title.next').should($nextPage => {
            expect($nextPage.text()).to.contain("2");
            expect($nextPage.text()).to.not.contain("3");
        });
    });
});