"use strict";

const request = require("supertest");
const app = require("../src/configs/express");

describe("Server", () => {
  it("should be start server", done => {
    request(app)
      .get("/")
      .expect(200)
      .end(done);
  });
});
