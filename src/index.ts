import express from "express";
import routes from "./routes/main";

const app = express();
const PORT = 3000;

app.use("/", routes);

app.listen(PORT, (): void => {
  console.log("Server listening on PORT", PORT);
});

export default app;
