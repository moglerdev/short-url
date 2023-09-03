import express from "express";
import { Links } from "./links.ts";
import { createClient } from "redis";
import cors from "cors";

const app = express();
const port = 3000;

const client = createClient({
  url: "redis://localhost:6379",
});

if (!client.isOpen) {
  console.log("Connected to Redis!");
  await client.connect();
}
const links = new Links(client);

process.on("SIGINT", () => {
  console.log("Bye!");
  process.exit();
});

app.use(express.json());
app.use(cors());

app.get("/links/all", async (_req, res) => {
  const x = await links.getAll();

  res.json(x.map((x) => ({
    key: x.key,
    value: x.value,
    accessCount: x.accessCount,
    url: `${_req.protocol}://${_req.get("host")}/${x.key}`
  })));
  console.log("[GET] /links/all");
});

app.post("/links/create", async (_req, res) => {
  const url = _req.body.url;
  if (!url) {
    res.statusCode = 400;
    res.json({ code: 400, message: "No url provided" });
    return;
  };

  // check if url is absolute
  try {
    new URL(url);
  } catch (e) {
    res.statusCode = 400;
    res.json({ code: 400, message: "invalid url" });
    return;
  }

  const key = await links.createShortLink(url);
  res.json({
    code: 200,
    message: "OK",
    payload: { key, url: `${_req.protocol}://${_req.get("host")}/${key}` },
  });
  console.log("[POST] /links/create", url);
});

app.post("/links/delete", async (_req, res) => {
  const key = _req.body.key;

  if (!key) {
    res.statusCode = 400;
    res.json({ code: 400, message: "No key provided" });
    return;
  };

  await links.removeShortLink(_req.body.key);
  res.json({ code: 200, message: "OK" });
  console.log("[POST] /links/delete", key);
});

app.get("/links/read/:code", async (_req, res) => {
  res.send(await links.getShortLink(_req.params.code));
  console.log("[GET] /links/read", _req.params.code);
});

app.get("/:code", async (_req, res) => {
  const x = await links.getShortLink(_req.params.code);
  if (!x) {
    res.statusCode = 404;
    res.send("Not found");
    return;
  }
  console.log("[GET] /:code", _req.params.code);
  res.redirect(x);
  await links.addAccessCount(_req.params.code);
});

app.get("/_/:path", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
