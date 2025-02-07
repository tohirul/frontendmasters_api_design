import app from "../server";
import supertest from "supertest";

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const res = await supertest(app).get("/").send();
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Hello World");
  });
});
