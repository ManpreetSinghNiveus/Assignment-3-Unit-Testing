let app = require("../app.js");
const request = require("supertest");
const mongoose = require("mongoose");

describe("User API's", () => {
  beforeAll((done) => {
    done();
  });
  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
    done();
  });
  let userId;
  beforeEach(async () => {
    const user = {
      name: "Manpreet Singh",
      email: "mannysingh400@gmail.com",
      password: "manpreet321^&",
    };
    const res = await request(app).post("/users/create-user").send(user);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
    userId = res.body._id;
    userId = res.body._id;
  });
  afterEach(async () => {
    await request(app).delete(`/users/delete-user/${userId}`);
  });

  //Test case for getting all users
  test("should get all users", async () => {
    const res = await request(app).get("/users/get-users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  //Test case for updating user
  test("should update user", async () => {
    const updateData = {
      name: "Rajat Pai",
    };
    const res = await request(app)
      .put(`/users/update-user/${userId}`)
      .send(updateData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id", userId);
    expect(res.body).toHaveProperty("name", updateData.name);
  });
});
