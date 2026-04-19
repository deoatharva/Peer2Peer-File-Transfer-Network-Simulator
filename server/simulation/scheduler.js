import { chunkFile } from "./fileChunker.js";
import { store } from "../data/inMemoryStore.js";
import { requestChannel, releaseChannel } from "./macLayer.js";
import {
  initPeerCongestion,
  getCwnd,
  onAck,
  onLoss
} from "./congestion.js";
import { updateMetrics } from "./metrics.js";

export const simulateTransfer = async (io, file) => {
  const peers = Object.values(store.peers);

  if (peers.length < 2) {
    console.log("❌ Not enough peers");
    io.emit("log", "❌ Not enough peers to start transfer");
    return;
  }

  // 🔥 Initialize congestion state
  peers.forEach((p) => initPeerCongestion(p.id));

  const chunks = chunkFile(file);

  if (!chunks.length) {
    console.log("❌ No chunks created — invalid file");
    io.emit("log", "❌ No chunks created — file error");
    return;
  }

  console.log("📦 Total chunks:", chunks.length);
  io.emit("log", `📦 Total chunks: ${chunks.length}`);

  // 🔥 Reset storage
  store.receivedChunks = {};
  let deliveredCount = 0;

  let i = 0;

  // 🔥 NEW: RETRANSMISSION FUNCTION
  const sendPacket = (packet, sender, receiver, retry = 0) => {
    const delay = packet.delay;
    const isLost = Math.random() < 0.2;

    setTimeout(() => {
      if (isLost) {
        console.log("❌ Lost:", packet.chunkId);
        io.emit("log", `❌ Packet lost: ${packet.chunkId}`);

        onLoss(sender.id);
        updateMetrics(packet, false);

        // 🔁 RETRY MAX 3 TIMES
        if (retry < 3) {
          io.emit(
            "log",
            `🔁 Retransmitting chunk ${packet.chunkId} (retry ${retry + 1})`
          );
          sendPacket(packet, sender, receiver, retry + 1);
        } else {
          io.emit("log", `💀 Chunk permanently lost: ${packet.chunkId}`);
        }
      } else {
        console.log("✅ Delivered:", packet.chunkId);
        io.emit("log", `✅ Packet delivered: ${packet.chunkId}`);

        onAck(sender.id);
        updateMetrics(packet, true);

        // 🔥 GRAPH ANIMATION
        io.emit("packet:transfer", packet);

        // 🔥 METRICS
        io.emit("metrics:update", {
          latency: delay,
          lost: false,
          time: Date.now(),
        });

        // 🔥 STORE RECEIVED DATA
        if (!store.receivedChunks[receiver.id]) {
          store.receivedChunks[receiver.id] = [];
        }

        // 🔥 AVOID DUPLICATES
        const exists = store.receivedChunks[receiver.id].some(
          (c) => c.chunkId === packet.chunkId
        );

        if (!exists) {
          store.receivedChunks[receiver.id].push(packet);
          deliveredCount++;
        }

        // 🔥 PROGRESS
        const percent = ((deliveredCount / chunks.length) * 100).toFixed(2);
        io.emit("progress", { percent });

        // 🔥 COMPLETE CHECK
        if (deliveredCount === chunks.length) {
          console.log("📥 File fully received by", receiver.id);
          io.emit("log", `📥 File received by ${receiver.id}`);

          io.emit("file:ready", {
            peerId: receiver.id,
            chunks: store.receivedChunks[receiver.id],
          });
        }
      }

      releaseChannel(io);
    }, delay);
  };

  const loop = async () => {
    if (i >= chunks.length) {
      console.log("✅ Transfer loop finished");
      io.emit("log", "✅ Transfer loop finished");
      return;
    }

    const sender = peers[i % peers.length];
    const receiver = peers[(i + 1) % peers.length];

    const cwnd = getCwnd(sender.id);

    for (let w = 0; w < cwnd && i < chunks.length; w++) {
      const mac = await requestChannel(sender.id, io);

      if (!mac.granted) {
        console.log("⚠️ Collision:", sender.id);
        io.emit("log", `⚠️ Collision at ${sender.id}`);
        onLoss(sender.id);
        continue;
      }

      const delay = 1500 + Math.random() * 2000;

      const packet = {
        from: sender.id,
        to: receiver.id,
        chunkId: chunks[i].id,
        data: chunks[i].data,
        delay,
      };

      // 🔥 USE RETRANSMISSION FUNCTION
      sendPacket(packet, sender, receiver);

      i++;
    }

    setTimeout(loop, 1000);
  };

  loop();
};