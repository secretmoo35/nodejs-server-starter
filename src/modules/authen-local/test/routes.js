"use strict";
let request = require("supertest"),
  assert = require("assert"),
  mongoose = require("mongoose"),
  _model = require("../models/model").model,
  app = require("../../../configs/express"),
  Model = mongoose.model(_model);

let credentials;

describe(_model + " Authentication routes tests", () => {
  before(done => {
    credentials = {
      username: "username",
      password: "password",
      firstName: "firstname",
      lastName: "lastname",
      email: "test@email.com"
    };
    done();
  });

  it("should be " + _model + " signup", done => {
    request(app)
      .post("/api/auth/signup")
      .send(credentials)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        assert.equal(resp.status, 200);
        assert.notEqual(resp.token, null);
        done();
      });
  });

  it("should be " + _model + " signin", done => {
    request(app)
      .post("/api/auth/signin")
      .send(credentials)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        assert.equal(resp.status, 200);
        assert.notEqual(resp.token, null);
        done();
      });
  });

  it(
    "should be " + _model + " signup duplicate username (status 400)",
    done => {
      credentials = {
        username: "username",
        password: "password",
        firstName: "firstname",
        lastName: "lastname",
        email: "test1@email.com"
      };
      request(app)
        .post("/api/auth/signup")
        .send(credentials)
        .expect(400)
        .end((err, res) => {
          assert.notEqual(
            res.body.message.indexOf("username already exists"),
            -1
          );
          done();
        });
    }
  );

  it("should be " + _model + " signup duplicate email (status 400)", done => {
    credentials = {
      username: "username1",
      password: "password",
      firstName: "firstname",
      lastName: "lastname",
      email: "test@email.com"
    };

    request(app)
      .post("/api/auth/signup")
      .send(credentials)
      .expect(400)
      .end((err, res) => {
        assert.notEqual(res.body.message.indexOf("email already exists"), -1);
        done();
      });
  });

  it(
    "should be " + _model + " signup if no firstname is provided (status 400)",
    done => {
      credentials = {
        username: "username1",
        password: "password",
        firstName: "",
        lastName: "lastname",
        email: "test@email.com"
      };

      request(app)
        .post("/api/auth/signup")
        .send(credentials)
        .expect(400)
        .end((err, res) => {
          assert.notEqual(
            res.body.message.indexOf("Please fill in your first name"),
            -1
          );
          done();
        });
    }
  );

  it(
    "should be " + _model + " signup if no lastname is provided (status 400)",
    done => {
      credentials = {
        username: "username1",
        password: "password",
        firstName: "firstname",
        lastName: "",
        email: "test@email.com"
      };

      request(app)
        .post("/api/auth/signup")
        .send(credentials)
        .expect(400)
        .end((err, res) => {
          assert.notEqual(
            res.body.message.indexOf("Please fill in your last name"),
            -1
          );
          done();
        });
    }
  );

  it("should be " + _model + " get profile logged in use token", done => {
    credentials = {
      username: "username",
      password: "password",
      firstName: "firstname",
      lastName: "lastname",
      email: "test@email.com"
    };
    request(app)
      .post("/api/auth/signin")
      .send(credentials)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        request(app)
          .get("/api/user")
          .set("Authorization", "Bearer " + res.body.token)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            let resp = res.body;
            assert.equal(resp.status, 200);
            assert.equal(resp.data.username, credentials.username);
            assert.equal(resp.data.firstName, credentials.firstName);
            assert.equal(resp.data.lastName, credentials.lastName);
            assert.equal(resp.data.email, credentials.email);
            assert.equal(
              resp.data.displayName,
              credentials.firstName + " " + credentials.lastName
            );
            done();
          });
      });
  });

  after(done => {
    Model.remove().exec(done);
  });
});
