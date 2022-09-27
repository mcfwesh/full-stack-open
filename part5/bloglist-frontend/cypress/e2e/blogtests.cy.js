/// <reference types="cypress" />

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "root",
      password: "example",
    });
    cy.request("POST", "http://localhost:3003/api/users", {
      username: "root-1",
      password: "example",
    });
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("Login").click();
    cy.contains("Username");
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("root");
      cy.get("#password").type("example");
      cy.get("#login").click();

      cy.contains("Welcome root");
    });

    it("fails with wrong credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("wrong");
      cy.get("#password").type("example");
      cy.get("#login").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });

    describe("when logged in", function () {
      beforeEach(function () {
        cy.login({ username: "root", password: "example" });
        cy.createNote({
          title: "first title",
          author: "Mr example",
          url: "example.com",
        });
        cy.createNote({
          title: "second title",
          author: "Mr example",
          url: "example.com",
        });
      });

      it("A blog can be created", function () {
        cy.contains("first title");
      });

      it("blog can be liked", function () {
        cy.contains("Show").click();
        cy.get(".blog-list-body").contains("Like").as("likeButton");
        cy.get("@likeButton").click();
        cy.get("@likeButton").click();
        cy.get(".blog-list-body")
          .contains("Like")
          .parent()
          .contains("Likes: 2");
      });

      it("blog can be deleted by the user", function () {
        cy.contains("Show").click();
        cy.contains("Delete").click();
        cy.should("not.contain", "first title");
      });

      it("blog cannot be deleted by another user", function (done) {
        cy.login({ username: "root-1", password: "example" });
        cy.contains("Show").click();
        cy.contains("Delete").click();
        cy.on("uncaught:exception", (err, runnable) => {
          expect(err.message).to.include("Request failed with status code 401");
          done();
          return false;
        });
        cy.should("contain", "first title");
      });

      it.only("blogs are ordered by number of likes", function () {
        cy.get(".blog").eq(0).should("contain", "first title").as("first");
        cy.get("@first").contains("Show").click();
        cy.get("@first").contains("Like").as("firstLikeButton");
        cy.get("@firstLikeButton").click();

        cy.get(".blog").eq(1).should("contain", "second title").as("second");
        cy.get("@second").contains("Show").click();
        cy.get("@second").contains("Like").as("secondLikeButton");
        cy.get("@secondLikeButton").click();
        cy.get("@secondLikeButton").click();

        cy.get(".blog").eq(0).should("contain", "second title");
      });
    });
  });
});
