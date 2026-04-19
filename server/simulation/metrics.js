import { store } from "../data/inMemoryStore.js";

export const updateMetrics = (packet, success) => {
  const latency = packet.delay;

  store.metrics.latency.push(latency);

  if (!success) {
    store.metrics.packetLoss += 1;
  }

  store.metrics.throughput.push({
    time: Date.now(),
    size: success ? 1 : 0
  });
};