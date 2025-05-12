import { useEffect, useRef, useState } from "react";

const TradeVolumeTracker = () => {
  const [buyVolume, setBuyVolume] = useState(0);
  const [sellVolume, setSellVolume] = useState(0);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/atomusdt@trade"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const quantity = parseFloat(data.q);
      const price = parseFloat(data.p);
      const volume = price * quantity;

      if (data.m) {
        // Sell
        setSellVolume((prev) => prev + volume);
      } else {
        // Buy
        setBuyVolume((prev) => prev + volume);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      <h2>BTC/USDT Volume</h2>
      <p>🟢 Buy Volume: {buyVolume.toFixed(2)} USDT</p>
      <p>🔴 Sell Volume: {sellVolume.toFixed(2)} USDT</p>
      <p>📈 Trend: {buyVolume > sellVolume ? "Pump" : "Dump"}</p>
    </div>
  );
};

export default TradeVolumeTracker;
