"use strict";
let request = require("supertest"),
  assert = require("assert"),
  mongoose = require("mongoose"),
  _model = require("../models/model").model,
  app = require("../../../configs/express"),
  Model = mongoose.model(_model),
  User = mongoose.model("User");

let item, credentials, token;

describe(_model + " CRUD routes tests", () => {
  before(done => {
    item = {
      name: "name"
    };
    credentials = {
      username: "username",
      password: "password",
      firstName: "first name",
      lastName: "last name",
      email: "test@email.com"
    };
    done();
  });

  it("should be signup get token for test ", done => {
    request(app)
      .post("/api/auth/signup")
      .send(credentials)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        token = resp.token;
        assert.notEqual(resp.token, null);
        done();
      });
  });

  it("should be " + _model + " get", done => {
    request(app)
      .get("/api/" + _model)
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        assert.equal(resp.status, 200);
        assert.equal(resp.datas.length, 0);
        done();
      });
  });

  it("should be " + _model + " get by id", done => {
    request(app)
      .post("/api/" + _model)
      .set("Authorization", "Bearer " + token)
      .send(item)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        request(app)
          .get("/api/" + _model + "/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            let resp = res.body;
            assert.equal(resp.status, 200);
            assert.equal(resp.data.name, item.name);
            done();
          });
      });
  });

  it("should be " + _model + " post use token", done => {
    request(app)
      .post("/api/" + _model)
      .set("Authorization", "Bearer " + token)
      .send(item)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        assert.equal(resp.status, 200);
        assert.equal(resp.data.name, item.name);
        done();
      });
  });

  it("should be " + _model + " put use token", done => {
    request(app)
      .post("/api/" + _model)
      .set("Authorization", "Bearer " + token)
      .send(item)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        let update = {
          name: "name update"
        };
        request(app)
          .put("/api/" + _model + "/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .send(update)
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            let resp = res.body;
            assert.equal(resp.status, 200);
            assert.equal(resp.data.name, update.name);
            done();
          });
      });
  });

  it("should be " + _model + " delete use token", done => {
    request(app)
      .post("/api/" + _model)
      .set("Authorization", "Bearer " + token)
      .send(item)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        request(app)
          .delete("/api/" + _model + "/" + resp.data._id)
          .set("Authorization", "Bearer " + token)
          .expect(200)
          .end(done);
      });
  });

  it("should be " + _model + " post not use token", done => {
    request(app)
      .post("/api/" + _model)
      .send(item)
      .expect(403)
      .expect({
        message: "User is not authorized"
      })
      .end(done);
  });

  it("should be " + _model + " put not use token", done => {
    request(app)
      .post("/api/" + _model)
      .set("Authorization", "Bearer " + token)
      .send(item)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        let update = {
          name: "name update"
        };
        request(app)
          .put("/api/" + _model + "/" + resp.data._id)
          .send(update)
          .expect(403)
          .expect({
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  it("should be " + _model + " delete not use token", done => {
    request(app)
      .post("/api/" + _model)
      .set("Authorization", "Bearer " + token)
      .send(item)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let resp = res.body;
        request(app)
          .delete("/api/" + _model + "/" + resp.data._id)
          .expect(403)
          .expect({
            message: "User is not authorized"
          })
          .end(done);
      });
  });

  afterEach(done => {
    User.remove().exec(() => {
      Model.remove().exec(done);
    });
  });
});
