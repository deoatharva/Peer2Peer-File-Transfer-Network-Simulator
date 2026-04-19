import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const MacStatus = () => {
  const socket = useSocket();
  const [status, setStatus] = useState("IDLE");
  const [activePeer, setActivePeer] = useState("");

  useEffect(() => {
    socket.on("mac:update", (data) => {
      setStatus(data.status);
      setActivePeer(data.by || "");
    });

    return () => socket.off("mac:update");
  }, [socket]);

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="mb-2 font-bold">MAC Layer</h2>

      <p className={status === "BUSY" ? "text-red-400" : "text-green-400"}>
        Status: {status}
      </p>

      {status === "BUSY" && (
        <p className="text-sm text-gray-400">
          Transmitting: {activePeer.slice(0, 6)}
        </p>
      )}
    </div>
  );
};

export default MacStatus;