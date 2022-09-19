import fs from "fs";
import path from "path";
import sharpEditor from "../../utils/sharpEditor";

describe("test sharpEditor() function", () => {
  const fileName = "fjord";
  const height = "130";
  const width = "150";
  const inputImgPath = path.resolve(`./images/${fileName}.jpg`);
  const outputImgPath = path.resolve(
    `./thumbnails/${fileName}_${width}_${height}.jpeg`
  );

  it("should create resized image in thumbnails folder with given params", async () => {
    await sharpEditor(inputImgPath, outputImgPath, width, height);
    expect(fs.existsSync(outputImgPath)).toBeTrue;
  });
  it("should throw an error for non-existed input path", async () => {
    expect(await sharpEditor("wrong_path", outputImgPath, width, height))
      .toThrow;
  });
  it("should throw an error for non-existed output path", async () => {
    expect(await sharpEditor(inputImgPath, "wrong_path", width, height))
      .toThrow;
  });
  afterAll(() => {
    fs.unlinkSync(outputImgPath);
  });
});
