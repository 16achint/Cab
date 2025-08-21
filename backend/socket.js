import { Server } from "socket.io";
import userModel from "./models/user.model.js";
import captionModel from "./models/captain.model.js";

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("join", async (data) => {
            const { userId, userType } = data;
            console.log("data", data);
            if (userType == "user") {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            if (userType == "captain") {
                await captionModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on("update-location-captain", async (data) => {
            const { userId, location } = data;
            if (!location || !location.ltd || !location.lng) {
                return socket.emit("error", { message: "invaild location data" });
            }

            await captionModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng,
                },
            });

            socket.on("disconnect", () => {
                console.log(`Client disconnected: ${socket.id}`);
            });
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        console.log("hello achint here messageObject", messageObject);
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log("Socket.io not initialized");
    }
};

export { initializeSocket, sendMessageToSocketId };
