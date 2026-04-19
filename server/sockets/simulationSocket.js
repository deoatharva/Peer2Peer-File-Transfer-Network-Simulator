import { simulateTransfer } from "../simulation/scheduler.js";

export const handleSimulationEvents = (io, socket) => {

  socket.on("file:upload", async (file) => {
    console.log("📁 File received:", file.name);
    io.emit("log", `📁 File uploaded: ${file.name}`);

    simulateTransfer(io, file);
  });

};