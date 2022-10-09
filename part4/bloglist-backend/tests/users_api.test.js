const app = require("../app");
const BlogUser = require("../models/users");
const helpers = require("../tests/helpers");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");

const api = supertest(app);

describe("create new user", () => {
  beforeEach(async () => {
    await BlogUser.deleteMany({});
    const saltRound = 10;
    const passwordHash = await bcrypt.hash("example", saltRound);
    const user = new BlogUser({
      name: "root",
      username: "root",
      password: passwordHash,
    });
    await user.save();
  });
  test("can add user successfully", async () => {
    const dbAtStart = await helpers.usersInDb();
    const newUser = { name: "super", username: "super", password: "example" };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const dbAtEnd = await helpers.usersInDb();
    expect(dbAtEnd).toHaveLength(dbAtStart.length + 1);
    expect(dbAtEnd.map((user) => user.username)).toContain("super");
  });
  test("invalid users can not be added", async () => {
    const dbAtStart = await helpers.usersInDb();
    const newUser = { name: "super", username: "super", password: "ex" };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const dbAtEnd = await helpers.usersInDb();
    expect(dbAtEnd).toHaveLength(dbAtStart.length);
    expect(response.body.error).toEqual("invalid username or password");
  });
  test("existing users can not be added", async () => {
    const dbAtStart = await helpers.usersInDb();
    const newUser = { name: "root", username: "root", password: "example" };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const dbAtEnd = await helpers.usersInDb();
    expect(dbAtEnd).toHaveLength(dbAtStart.length);
    expect(response.body.error).toEqual("invalid username or password");
  });
  test("username and password is required", async () => {
    const dbAtStart = await helpers.usersInDb();
    const newUser = { name: "super" };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const dbAtEnd = await helpers.usersInDb();
    expect(dbAtEnd).toHaveLength(dbAtStart.length);
    expect(response.body.error).toEqual("Bad Request");
  });
});

describe("get all users", () => {
  beforeEach(async () => {
    await BlogUser.deleteMany({});
    const saltRound = 10;
    const passwordHash = await bcrypt.hash("example", saltRound);
    const user = new BlogUser({
      name: "root",
      username: "root",
      password: passwordHash,
    });
    await user.save();
  });
  test("can get all users", async () => {
    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const db = await helpers.usersInDb();
    expect(response.body).toHaveLength(db.length);
  });
});

describe("login", () => {
  beforeEach(async () => {
    await BlogUser.deleteMany({});
    const saltRound = 10;
    const passwordHash = await bcrypt.hash("example", saltRound);
    const user = new BlogUser({
      name: "root",
      username: "root",
      password: passwordHash,
    });
    await user.save();
  });
  test("can login successfully", async () => {
    const user = { username: "root", password: "example" };

    const response = await api.post("/api/login").send(user).expect(200);
    expect(response.body.token).toBeDefined();
  });
  test("cannot login successfully if username or password is invalid", async () => {
    const user = { username: "roo", password: "exampl" };

    const response = await api.post("/api/login").send(user).expect(401);
    expect(response.body.token).toBeUndefined();
  });
});

afterAll(() => mongoose.connection.close());
