/* eslint-disable no-unused-vars */
const request = require("supertest");
var cheerio = require("cheerio");

const db = require("../models/index");
const app = require("../app");

describe("test suite", () => {
  test("empty test", async () => {
    expect(true).toBe(true);
  });
});
