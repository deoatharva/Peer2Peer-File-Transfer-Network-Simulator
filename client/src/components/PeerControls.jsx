import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import PeerCard from "./PeerCard";

const PeerControls = () => {
  const socket = useSocket();
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    const handlePeerList = (data) => {
      setPeers(Array.isArray(data) ? data : []);
    };

    socket.on("peer:list", handlePeerList);

    return () => {
      socket.off("peer:list", handlePeerList);
    };
  }, [socket]);

  const addPeer = () => socket.emit("peer:add");
  const removePeer = () => socket.emit("peer:remove");

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="mb-2 font-semibold text-lg">Peers</h2>

      <div className="mb-3 flex gap-2">
        <button
          onClick={addPeer}
          className="bg-green-500 px-3 py-1 rounded"
        >
          Add Peer
        </button>

        <button
          onClick={removePeer}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Remove Peer
        </button>
      </div>

      <div className="space-y-2">
        {peers.map((peer) => (
          <PeerCard key={peer.id} peer={peer} />
        ))}
      </div>
    </div>
  );
};

export default PeerControls;