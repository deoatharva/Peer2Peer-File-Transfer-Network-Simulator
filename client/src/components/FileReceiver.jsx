import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

const FileReceiver = () => {
  const socket = useSocket();

  useEffect(() => {
    socket.on("file:ready", (data) => {
      const blob = new Blob(
        data.chunks.map(c => new Uint8Array(c.data))
      );

      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "received_file";
      a.click();
    });

    return () => socket.off("file:ready");
  }, []);

  return null;
};

export default FileReceiver;