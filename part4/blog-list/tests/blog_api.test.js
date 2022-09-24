const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const Blog = require("../models/blogs");
const BlogUser = require("../models/users");
const helpers = require("./helpers");
const mongoose = require("mongoose");

const api = supertest(app);

let token;

beforeEach(async () => {
  //create new user
  await BlogUser.deleteMany({});
  const saltRound = 10;
  const passwordHash = await bcrypt.hash("example", saltRound);
  const user = new BlogUser({
    name: "root",
    username: "root",
    password: passwordHash,
  });
  await user.save();

  //login to add new blog
  const existingUser = { username: "root", password: "example" };
  const loggedInUser = await api
    .post("/api/login")
    .send(existingUser)
    .expect(200);
  token = loggedInUser.body.token;

  //create new blogs and add a logged in user to the first blog
  await Blog.deleteMany({});
  const userToBeAdded = await BlogUser.findOne({
    username: loggedInUser.body.username,
  });
  helpers.initialBlogs[0].user = userToBeAdded._id;
  const newOne = await Blog.create(helpers.initialBlogs);
});

describe("when initial blogs have been saved", () => {
  test("gets correct amount of blogposts", async () => {
    const persons = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(persons.body).toHaveLength(helpers.initialBlogs.length);
  });
});

describe("properties are what they should be", () => {
  test("unique identifier property is name 'id'", async () => {
    const blogs = await helpers.blogsInDb();
    const oneBlog = blogs[0];
    expect(oneBlog.id).toBeDefined();
  });
});

describe("add new blog", () => {
  test("create a new blog post", async () => {
    const dbUsers = await helpers.usersInDb();
    const anyUserId = dbUsers[0].id;

    const newBlog = {
      title: "New one",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: anyUserId,
    };
    await api
      .post(`/api/blogs`)
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helpers.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length + 1);
    expect(blogsAtEnd.map((blog) => blog.title)).toContain("New one");
    const usernamesInBlogDB = blogsAtEnd.map((blog) => blog.user?.username);
    expect(usernamesInBlogDB).toContain(dbUsers[0].username);
  });

  test("unable to create a blog post due to no authorization", async () => {
    const dbUsers = await helpers.usersInDb();
    const anyUserId = dbUsers[0].id;

    const newBlog = {
      title: "New one",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: anyUserId,
    };
    await api
      .post(`/api/blogs`)
      .set("Authorization", null)
      .send(newBlog)
      .expect(401);

    const blogsAtEnd = await helpers.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length);
  });

  test("likes default to 0 if 'likes' property of a newly added blog is missing", async () => {
    const dbUsers = await helpers.usersInDb();
    const anyUserId = dbUsers[0].id;

    const newBlog = {
      title: "New one",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      user: anyUserId,
    };
    const result = await api
      .post(`/api/blogs`)
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helpers.blogsInDb();
    expect(result.body.likes).toBe(0);
  });

  test("responds to 400 Bad request if 'title' and 'url' properties are missing", async () => {
    const newBlog = {
      author: "Michael Chan",
    };
    await api
      .post(`/api/blogs`)
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

describe("deletion of a blog", () => {
  test("a blog can be deleted by only the user who created it", async () => {
    const blogsAtStart = await helpers.blogsInDb();
    const userDb = await helpers.usersInDb();
    const oneBlog = blogsAtStart.filter((blog) => blog.user)[0];
    console.log(blogsAtStart, userDb[0].id);
    await api
      .delete(`/api/blogs/${oneBlog.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helpers.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helpers.initialBlogs.length - 1);
    expect(userDb[0].id).toBe(oneBlog.user.id);
  });
});

describe("update a blog", () => {
  test("a blog can be updated", async () => {
    const update = { title: "Myraids of Glory" };
    const blogsAtStart = await helpers.blogsInDb();
    const oneBlog = blogsAtStart[0];

    const response = await api
      .put(`/api/blogs/${oneBlog.id}`)
      .send(update)
      .expect(200);

    const blogsAtEnd = await helpers.blogsInDb();
    expect(response.body.title).toBe("Myraids of Glory");
    expect(blogsAtEnd.map((blog) => blog.title)).toContain("Myraids of Glory");
  });
});

afterAll(() => mongoose.connection.close());
