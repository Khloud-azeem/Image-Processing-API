import supertest from "supertest";
import app from "../../../index";
import path from "path";
import fs from "fs";

const request = supertest(app);

describe("test /imageResize endpoint", () => {
  const fileName = "fjord";
  const height = 130;
  const width = 150;
  const outputImgPath = path.resolve(
    `./thumbnails/${fileName}_${width}_${height}.jpeg`
  );

  it("should returns 200 status code for correct params values", async () => {
    const response = await request.get(
      `/imageResize?fileName=${fileName}&height=${height}&width=${width}`
    );
    expect(response.status).toBe(200);
  });
  it("should return 404 status code for missing fileName parameter", async () => {
    const response = await request.get(
      `/imageResize?height=${height}&width=${width}`
    );
    expect(response.status).toBe(404);
  });
  it("should return 400 status code for missing width parameter", async () => {
    const response = await request.get(
      `/imageResize?fileName=${fileName}&height=${height}`
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 status code for missing height parameter", async () => {
    const response = await request.get(
      `/imageResize?fileName=${fileName}&width=${width}`
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 status code for non-number width parameter", async () => {
    const response = await request.get(
      `/imageResize?fileName=${fileName}&height=${height}&width=word`
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 status code for non-number height parameter", async () => {
    const response = await request.get(
      `/imageResize?fileName=${fileName}&height=word&width=${width}`
    );
    expect(response.status).toBe(400);
  });
  afterAll(() => {
    fs.unlinkSync(outputImgPath);
  });
});
