import { useSocket } from "../context/SocketContext";

const FileUpload = () => {
  const socket = useSocket();

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

  reader.onload = () => {
    socket.emit("file:upload", {
      name: file.name,
      size: file.size,
      data: Array.from(new Uint8Array(reader.result)), // 🔥 REQUIRED
    });
  };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2 className="mb-2">Upload File</h2>
      <input type="file" onChange={handleUpload} />
    </div>
  );
};

export default FileUpload;