import PeerControls from "./components/PeerControls";
import NetworkGraph from "./components/NetworkGraph";
import ProgressBar from "./components/ProgressBar";
import LogsPanel from "./components/LogsPanel";
import FileUpload from "./components/FileUpload";
import CongestionChart from "./components/CongestionChart";
import MACStatus from "./components/MACStatus";

function App() {
  return (
    <div className="p-4 space-y-4">

      {/* TOP */}
      <div className="grid grid-cols-3 gap-4">
        <PeerControls />
        <FileUpload />
        <MACStatus />
      </div>

      {/* PROGRESS */}
      <ProgressBar />

      {/* NETWORK */}
      <NetworkGraph />

      {/* ANALYTICS */}
      <div className="grid grid-cols-2 gap-4">
        <CongestionChart />
        <LogsPanel />
      </div>

    </div>
  );
}

export default App;