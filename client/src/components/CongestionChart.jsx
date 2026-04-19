import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CongestionChart = () => {
  const socket = useSocket();
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    socket.on("metrics:update", (data) => {
      setDataPoints((prev) => [...prev.slice(-20), data.latency]);
    });

    return () => socket.off("metrics:update");
  }, []);

  const data = {
    labels: dataPoints.map((_, i) => i),
    datasets: [
      {
        label: "Latency (ms)",
        data: dataPoints,
      },
    ],
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl">
      <h2>📉 Congestion</h2>
      <Line data={data} />
    </div>
  );
};

export default CongestionChart;