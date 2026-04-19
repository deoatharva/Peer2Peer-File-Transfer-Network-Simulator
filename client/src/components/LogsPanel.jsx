import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";

const LogsPanel = () => {
  const socket = useSocket();
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleLog = (msg) => {
      setLogs((prev) => [...prev, msg]);
    };

    socket.on("log", handleLog);

    return () => socket.off("log", handleLog);
  }, [socket]);

  // 🔥 Auto scroll like real terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

return (
  <div className="bg-black text-green-400 p-4 rounded-xl h-75 overflow-y-auto font-mono text-sm border border-green-500 shadow-lg">
    {logs.map((log, i) => (
      <div key={i}>➜ {log}</div>
    ))}
    <div ref={bottomRef} />
  </div>
);
};

export default LogsPanel;