import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";

const PeerCard = ({ peer }) => {
  const socket = useSocket();
  const [fileReady, setFileReady] = useState(false);
  const [chunks, setChunks] = useState([]);

  if (!peer || !peer.id) return null;

  useEffect(() => {
    const handleFile = (data) => {
      if (data.peerId === peer.id) {
        setFileReady(true);
        setChunks(data.chunks);
      }
    };

    socket.on("file:ready", handleFile);

    return () => socket.off("file:ready", handleFile);
  }, [peer.id]);

  const downloadFile = () => {
    const sorted = chunks.sort((a, b) => a.chunkId - b.chunkId);
    const byteArrays = sorted.map((c) => new Uint8Array(c.data));

    const blob = new Blob(byteArrays);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `file_${peer.id}`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-3 bg-gray-700 rounded">
      <div>{peer.id.slice(0, 5)}</div>

      {fileReady && (
        <button
          onClick={downloadFile}
          className="mt-2 bg-blue-500 px-2 py-1 rounded"
        >
          Download
        </button>
      )}
    </div>
  );
};

export default PeerCard;