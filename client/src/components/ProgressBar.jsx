import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const ProgressBar = () => {
  const socket = useSocket();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    socket.on("progress", (data) => {
      setProgress(data.percent);
    });

    return () => socket.off("progress");
  }, []);

  return (
    <div className="bg-slate-800 p-3 rounded">
      <div>Transfer Progress</div>

      <div className="w-full bg-gray-600 h-3 rounded mt-1">
        <div
          className="bg-green-500 h-3 rounded"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-sm mt-1">{progress}%</div>
    </div>
  );
};

export default ProgressBar;