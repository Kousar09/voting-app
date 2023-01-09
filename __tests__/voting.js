/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const request = require("supertest");
var cheerio = require("cheerio");

const db = require("../models/index");
const app = require("../app");

let server, agent;
function extractCsrfToken(res) {
  var $ = cheerio.load(res.text);
  return $("[name=_csrf]").val();
}

const login = async (agent, username, password) => {
  let res = await agent.get("/login");
  let csrfToken = extractCsrfToken(res);
  res = await agent.post("/session").send({
    email: username,
    password: password,
    _csrf: csrfToken,
  });
};

describe("voting app Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });
  afterAll(async () => {
    try {
      await db.sequelize.close();
      server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("To signup as a new admin", async () => {
    res = await agent.get("/signup");
    const csrfToken = extractCsrfToken(res);
    res = await agent.post("/admins").send({
      firstName: "kousar",
      lastName: "shaik",
      email: "kousar@gmail.com",
      password: "123456789",
      _csrf: csrfToken,
    });
    expect(res.statusCode).toBe(302);
  });

  test("test for admin login", async () => {
    res = await agent.get("/elections");
    expect(res.statusCode).toBe(200);
    await login(agent, "kousar@gmail.com", "123456789");
    res = await agent.get("/elections");
    expect(res.statusCode).toBe(200);
  });

  test("test for admin signout", async () => {
    let res = await agent.get("/elections");
    expect(res.statusCode).toBe(200);
    res = await agent.get("/signout");
    expect(res.statusCode).toBe(302);
    res = await agent.get("/elections");
    expect(res.statusCode).toBe(302);
  });

  test("test to create election", async () => {
    const agent = request.agent(server);
    await login(agent, "kousar@gmail.com", "123456789");
    const res = await agent.get("/elections/create");
    const csrfToken = extractCsrfToken(res);
    const response = await agent.post("/elections").send({
      electionName: "election1",
      _csrf: csrfToken,
    });
    expect(response.statusCode).toBe(302);
  });
});
