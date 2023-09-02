import express from "express";
import { nanoid } from "nanoid";


const app = express();
const port = 3000;

app.get("/_/:path", (req, res) => {
  res.send("Hello World!");
});

app.get("/:code?", (req, res) => {
  res.send(nanoid(10));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
