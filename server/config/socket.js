import { Server } from "socket.io";
import { handlePeerEvents } from "../sockets/peerSocket.js";
import { handleSimulationEvents } from "../sockets/simulationSocket.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 New client connected:", socket.id);
    io.emit("log", `🟢 New client connected: ${socket.id}`);

    handlePeerEvents(io, socket);
    handleSimulationEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
      io.emit("log", `🔴 Client disconnected: ${socket.id}`);
    });
  });

  console.log("🚀 Socket server initialized");
};

export const getIO = () => io;