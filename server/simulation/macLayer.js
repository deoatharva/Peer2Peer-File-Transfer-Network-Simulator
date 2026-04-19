// server/simulation/macLayer.js

let channelBusy = false;

export const requestChannel = async (peerId, io) => {
  if (!channelBusy) {
    channelBusy = true;

    // 🔥 SEND BUSY STATE
    io.emit("mac:update", {
      status: "BUSY",
      by: peerId
    });

    return { granted: true };
  } else {
    return { granted: false };
  }
};

export const releaseChannel = (io) => {
  channelBusy = false;

  // 🔥 SEND IDLE STATE
  io.emit("mac:update", {
    status: "IDLE"
  });
};