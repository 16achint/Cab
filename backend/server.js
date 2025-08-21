import { createServer } from "http";
import app from "./app.js";
import { log } from "console";
import { initializeSocket } from "./socket.js";

const port = process.env.PORT || 3000;
const server = createServer(app);
initializeSocket(server);

server.listen(port, () => {
    log("server listening on port", port);
});
