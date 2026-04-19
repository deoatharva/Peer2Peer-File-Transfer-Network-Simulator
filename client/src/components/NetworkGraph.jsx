import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSocket } from "../context/SocketContext";

const NetworkGraph = () => {
  const svgRef = useRef();
  const socket = useSocket();

  const [peers, setPeers] = useState([]);
  const [packets, setPackets] = useState([]);

  useEffect(() => {
    const handlePeers = (data) => {
      setPeers(Array.isArray(data) ? data : []);
    };

    const handlePacket = (packet) => {
      setPackets((prev) => [...prev.slice(-20), packet]);
    };

    socket.on("peer:list", handlePeers);
    socket.on("packet:transfer", handlePacket);

    return () => {
      socket.off("peer:list", handlePeers);
      socket.off("packet:transfer", handlePacket);
    };
  }, [socket]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1000;
    const height = 500;

    const nodes = peers.map((p) => ({ id: p.id }));

    const links =
      peers.length > 1
        ? peers.map((p, i) => ({
            source: p.id,
            target: peers[(i + 1) % peers.length]?.id,
          }))
        : [];

    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#555")
      .attr("stroke-width", 2);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("r", 22)
      .attr("fill", "#3b82f6")
      .call(
        d3.drag()
          .on("start", dragStart)
          .on("drag", dragging)
          .on("end", dragEnd)
      );

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text((d) => d.id.slice(0, 4))
      .attr("fill", "white")
      .attr("font-size", 11);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("fill", (d) =>
          packets.some((p) => p.from === d.id) ? "orange" : "#3b82f6"
        );

      label.attr("x", (d) => d.x - 12).attr("y", (d) => d.y + 5);
    });

    // 🔥 FIXED ANIMATION (important)
    setTimeout(() => {
      packets.forEach((packet) => {
        const source = nodes.find((n) => n.id === packet.from);
        const target = nodes.find((n) => n.id === packet.to);

        if (!source || !target || !source.x || !target.x) return;

        const circle = svg
          .append("circle")
          .attr("r", 8)
          .attr("fill", "yellow")
          .attr("cx", source.x)
          .attr("cy", source.y);

        circle
          .transition()
          .duration(packet.delay)
          .ease(d3.easeLinear)
          .attr("cx", target.x)
          .attr("cy", target.y)
          .remove();
      });
    }, 300); // 🔥 KEY FIX

    function dragStart(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragging(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnd(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, [peers, packets]);

  return (
    <div className="bg-slate-900 p-4 rounded-xl shadow-lg">
      <h2 className="mb-2 text-lg font-bold">🌐 Live Network</h2>
      <svg ref={svgRef} width={1000} height={500}></svg>
    </div>
  );
};

export default NetworkGraph;