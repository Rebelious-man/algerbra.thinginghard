import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

app.get("/proxy", async (req, res) => {
  const target = req.query.url;
  if (!target) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(target);
    const contentType = response.headers.get("content-type");
    res.set("content-type", contentType);
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Failed to load: " + err.message);
  }
});

app.listen(PORT, () => console.log(`Fire Browser running on http://localhost:${PORT}`));

