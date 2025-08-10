import { createServer } from "http";
import app from "./app.js";
import { log } from "console";
const port = process.env.PORT || 3000;
const server = createServer(app);

server.listen(port, () => {
  log("server listening on port", port);
});
