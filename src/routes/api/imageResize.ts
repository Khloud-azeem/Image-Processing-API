import express from "express";
import fs from "fs";
import path from "path";
import sharpEditor from "../../utils/sharpEditor";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  // get query params
  const fileName = req.query.fileName as string;
  const imgHeight = req.query.height as string;
  const imgWidth = req.query.width as string;

  //check for valid width & height
  if (isNaN(parseInt(imgWidth)) || isNaN(parseInt(imgHeight))) {
    return res.status(400).send("No valid width or height entered!");
  }

  //check for valid input
  if (!fileName) {
    return res.status(404).send("No image file name entered!");
  }
  if (!imgWidth || !imgHeight) {
    return res.status(400).send("No image width or height entered!");
  }

  try {
    //create thumbnails folder
    const thumbDir = path.join(__dirname, "../../../thumbnails");
    if (!fs.existsSync(thumbDir)) {
      fs.mkdirSync(thumbDir);
    }
    //image path in images & thumbnails folders
    const imgPath = path.join(__dirname, `../../../images/${fileName}`);
    const thumbImgPath = path.join(
      thumbDir,
      `/${fileName}_${imgWidth}_${imgHeight}.jpeg`
    );

    //check for valid filename
    const isImg = fs.existsSync(imgPath);
    if (!isImg) {
      return res.status(404).send("Can't find an image with this name!");
    }

    //check if img is in thumbnails
    const isImgThumb = fs.existsSync(thumbImgPath);
    if (isImgThumb) {
      return res.status(200).sendFile(thumbImgPath);
    } else {
      //resize image using sharp
      await sharpEditor(imgPath, thumbImgPath, imgWidth, imgHeight);
      return res.status(200).sendFile(thumbImgPath);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal server error!");
  }
});

export default router;
