import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useSelector } from "react-redux";

const VolumeChart = () => {
  const history = useSelector((state) => state.orderBook.history);

  return (
    <LineChart width={700} height={300} data={history}>
      <CartesianGrid stroke="#ccc" />
      <XAxis
        dataKey="timestamp"
        tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="totalBids" stroke="#4caf50" name="Bids" />
      <Line type="monotone" dataKey="totalAsks" stroke="#f44336" name="Asks" />
    </LineChart>
  );
};

export default VolumeChart;
