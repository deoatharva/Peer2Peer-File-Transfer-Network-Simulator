import { store } from "../data/inMemoryStore.js";

export const handlePeerEvents = (io, socket) => {

  // Add peer
  socket.on("peer:add", () => {
    const peerId = socket.id;

    store.peers[peerId] = {
      id: peerId,
      chunks: [],
      connections: [],
      status: "idle"
    };

    console.log("➕ Peer added:", peerId);
    io.emit("log", `➕ Peer added: ${peerId}`);

    io.emit("peer:list", Object.values(store.peers));
  });

  // Remove peer
  socket.on("peer:remove", () => {
    delete store.peers[socket.id];

    console.log("➖ Peer removed:", socket.id);
    io.emit("log", `➖ Peer removed: ${socket.id}`);

    io.emit("peer:list", Object.values(store.peers));
  });

};