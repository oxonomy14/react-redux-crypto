import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderBook } from "../../redux/orderBook/operations";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const VolumeChart = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.orderBook.history);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchOrderBook("ATOMUSDT"));
    }, 10000); // кожні 10 секунд

    return () => clearInterval(interval);
  }, [dispatch]);

  // Обчислюємо загальний обʼєм бідів та асків на кожному записі
  const chartData = history.map((entry) => {
    const bidVolume = entry.bids.reduce(
      (sum, [_, amount]) => sum + parseFloat(amount),
      0
    );
    const askVolume = entry.asks.reduce(
      (sum, [_, amount]) => sum + parseFloat(amount),
      0
    );
    const time = new Date(entry.timestamp).toLocaleTimeString();
    return { time, bidVolume, askVolume };
  });

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 className="text-xl font-bold mb-2">
        Обʼєм покупок і продажів за 15 хвилин
      </h2>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" minTickGap={20} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="bidVolume"
            stroke="#82ca9d"
            name="Покупки"
          />
          <Line
            type="monotone"
            dataKey="askVolume"
            stroke="#ff6b6b"
            name="Продажі"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VolumeChart;
