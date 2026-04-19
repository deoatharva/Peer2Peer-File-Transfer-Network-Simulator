# 🚀 Peer-to-Peer File Sharing Network Simulator

### With MAC Protocol & Congestion Control Simulation

---

## 📌 Project Overview

This project is a **full-stack network simulator** that demonstrates how modern peer-to-peer (P2P) systems work internally.

It simulates:

* 📡 Peer-to-peer communication
* 📦 File chunking & distribution (BitTorrent-like)
* 📶 MAC layer behavior (channel access + collisions)
* 🚦 Congestion control (TCP-like AIMD)
* 📊 Real-time network visualization

---

## 🎯 Objectives

* Understand **P2P architecture**
* Simulate **network congestion & packet loss**
* Implement **MAC layer (CSMA-like)**
* Demonstrate **reliable file transfer with retransmission**
* Visualize network activity in real-time

---

## 🏗️ System Architecture

### 🔹 Components

1. **Peers (Nodes)**

   * Join/leave dynamically
   * Send/receive file chunks

2. **Tracker (Server)**

   * Maintains peer list
   * Coordinates simulation

3. **Simulation Engine**

   * Handles:

     * Chunk distribution
     * MAC scheduling
     * Congestion control

4. **Frontend Dashboard**

   * Network graph (D3.js)
   * Logs terminal
   * Progress tracking
   * MAC status

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* D3.js (Graph visualization)
* Chart.js (Congestion graph)

### Backend

* Node.js
* Express.js
* Socket.io (Real-time communication)

### Deployment

* Frontend: Vercel
* Backend: Render / Railway
* Code: GitHub

---

## ⚙️ Features

### 🔥 Core Features

* Add/remove peers dynamically
* Upload file → split into chunks
* Parallel chunk transfer across peers
* File reconstruction at receiver

### 📡 Network Simulation

* Packet delay simulation
* Packet loss simulation (20%)
* Retransmission (TCP-like reliability)

### 📶 MAC Layer

* Channel access control
* Collision detection
* Busy/Idle state visualization

### 🚦 Congestion Control

* Slow Start
* AIMD (Additive Increase, Multiplicative Decrease)

### 📊 Visualization

* Live network graph
* Moving packet animation
* Congestion chart
* Terminal-style logs

---

## 📁 Project Structure

```
server/
 ├── sockets/
 ├── simulation/
 ├── data/
 ├── server.js

client/
 ├── components/
 ├── context/
 ├── App.jsx
```

---

## ▶️ How to Run

### 1️⃣ Backend

```bash
cd server
npm install
npm run dev
```

---

### 2️⃣ Frontend

```bash
cd client
npm install
npm run dev
```

---

### 3️⃣ Open in Browser

```
http://localhost:5173
```

---

## 🧪 How to Test

1. Open multiple browsers (Chrome, Firefox, Brave)
2. Add peers
3. Upload a file
4. Observe:

   * Packet animation
   * MAC activity
   * Congestion graph
   * Progress bar
5. Download file at receiver

---

## 🧠 Key Concepts Implemented

### 📦 File Chunking

* File split into smaller chunks
* Enables parallel transmission

---

### 📶 MAC Protocol (CSMA-like)

* Only one peer can transmit at a time
* Others wait (collision simulation)

---

### 🚦 Congestion Control (AIMD)

* Increase rate gradually
* Reduce on packet loss

---

### 🔁 Retransmission

* Lost packets are resent
* Ensures 100% delivery

---

## ⚠️ Challenges Faced

* File corruption (fixed using Base64 encoding)
* Packet loss handling
* Synchronizing real-time animation
* Preventing duplicate chunk storage

---

## 🧠 Viva Questions

### ❓ Why use chunking?

👉 Improves speed via parallel transfer

### ❓ Why congestion control?

👉 Prevents network overload

### ❓ What happens on packet loss?

👉 Retransmission ensures reliability

### ❓ Difference between TCP & your system?

👉 Our system simulates TCP using retry logic

### ❓ Why MAC layer?

👉 Controls channel access to avoid collisions

---

## 🚀 Future Improvements

* Real WebRTC P2P (remove server dependency)
* Advanced routing algorithms
* Blockchain-based peer trust
* File encryption

---

## 👨‍💻 Authors

* Your Name (Team Lead)
* Team Members (if any)

---

## ⭐ Final Note

This project demonstrates **real-world networking concepts in a visual and interactive way**, making it ideal for academic learning and practical understanding of distributed systems.

---
