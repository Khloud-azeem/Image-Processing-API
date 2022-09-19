import sharp from "sharp";

const sharpEditor = async function (
  inputImgPath: string,
  outputImgPath: string,
  imgWidth: string,
  imgHeight: string
): Promise<void> {
  sharp(inputImgPath)
    .resize(parseInt(imgWidth), parseInt(imgHeight))
    .toFile(outputImgPath)
    .then((_) => {
      console.log("file created");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default sharpEditor;
