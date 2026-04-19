const congestionState = {};

export const initPeerCongestion = (peerId) => {
  congestionState[peerId] = {
    cwnd: 1,
    ssthresh: 8
  };
};

export const getCwnd = (peerId) => {
  return congestionState[peerId]?.cwnd || 1;
};

// On successful transmission
export const onAck = (peerId) => {
  const state = congestionState[peerId];

  if (!state) return;

  if (state.cwnd < state.ssthresh) {
    // Slow Start
    state.cwnd *= 2;
  } else {
    // Congestion Avoidance
    state.cwnd += 1;
  }
};

// On packet loss
export const onLoss = (peerId) => {
  const state = congestionState[peerId];

  if (!state) return;

  state.ssthresh = Math.max(state.cwnd / 2, 1);
  state.cwnd = 1;
};