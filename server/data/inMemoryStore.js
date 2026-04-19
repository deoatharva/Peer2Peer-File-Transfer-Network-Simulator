export const store = {
  peers: {},        // peerId -> peer object
  chunks: {},       // chunkId -> chunk data
  transfers: {},    // active transfers
  metrics: {
    latency: [],
    throughput: [],
    packetLoss: 0,
  },
  receivedChunks: {}
};