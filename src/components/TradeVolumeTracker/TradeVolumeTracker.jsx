// оновлення кожні 60 сек

import { useEffect, useState } from "react";

const TradeVolumeTracker = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade"
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const quantity = parseFloat(data.q);
      const price = parseFloat(data.p);
      const volume = quantity * price;
      const side = data.m ? "sell" : "buy";

      const newTrade = {
        volume,
        side,
        timestamp: Date.now(),
      };

      setTrades((prev) => [...prev, newTrade]);
    };

    return () => socket.close();
  }, []);

  // Очищаємо старі трейди щосекунди
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const cutoff = now - 60000; // останні 60 сек
      setTrades((prev) => prev.filter((trade) => trade.timestamp >= cutoff));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Обчислюємо об'єми
  const buyVolume = trades
    .filter((t) => t.side === "buy")
    .reduce((sum, t) => sum + t.volume, 0);
  const sellVolume = trades
    .filter((t) => t.side === "sell")
    .reduce((sum, t) => sum + t.volume, 0);

  return (
    <div>
      <h2>BTC/USDT (last 60s)</h2>
      <p>🟢 Buy Volume: {buyVolume.toFixed(2)} USDT</p>
      <p>🔴 Sell Volume: {sellVolume.toFixed(2)} USDT</p>
      <p>📈 Trend: {buyVolume > sellVolume ? "Pump" : "Dump"}</p>
    </div>
  );
};

export default TradeVolumeTracker;
