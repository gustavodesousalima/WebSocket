import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { createDocument, findDocument } from "./repository.js";
import { setupEvents } from "./events.js";

const app = express();

app.set("view engine", "ejs");

const currentPath = url.fileURLToPath(import.meta.url);
const publicDir = path.join(currentPath, "../..", "public");
app.use(express.static(publicDir));

app.get("*", async (req, res) => {
  const title = req.path.substring(1); // FIX: favicon.ico
  let document = await findDocument(title);
  if (!document) {
    document = await createDocument(title, "");
  }

  return res.render("index", { document });
});

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

const io = new Server(server);
setupEvents(io);

export default io;