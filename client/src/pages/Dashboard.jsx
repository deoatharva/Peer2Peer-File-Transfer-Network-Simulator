import Navbar from "../components/Navbar";
import PeerControls from "../components/PeerControls";
import FileUpload from "../components/FileUpload";
import NetworkGraph from "../components/NetworkGraph";
import CongestionChart from "../components/CongestionChart";
import MACStatus from "../components/MACStatus";

const Dashboard = () => {
  return (
    <div className="p-4 space-y-4">
      <Navbar />

      <div className="grid grid-cols-3 gap-4">
        <PeerControls />
        <FileUpload />
        <MACStatus />
      </div>

      <NetworkGraph />
      <CongestionChart />
    </div>
  );
};

export default Dashboard;