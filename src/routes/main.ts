import express from "express";
import imageResize from "./api/imageResize";
const routes = express.Router();

routes.get("/", (req: express.Request, res: express.Response): void => {
  res.send("Welcom to Imaging Processing API");
});

routes.use("/imageResize", imageResize);

export default routes;
