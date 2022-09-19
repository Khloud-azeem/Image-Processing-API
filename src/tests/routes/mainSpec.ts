import supertest from "supertest";
import app from "../../index";

const request = supertest(app);

it("should return 200 status code for main api endpoint", async () => {
  const response = await request.get("/");
  expect(response.status).toBe(200);
});
