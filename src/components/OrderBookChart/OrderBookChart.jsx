import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderBook } from "../../redux/orderBook/operations";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const OrderBookChart = () => {
  const dispatch = useDispatch();
  const { bids, asks } = useSelector((state) => state.orderBook);

  useEffect(() => {
    dispatch(fetchOrderBook("BTCUSDT"));

    const intervalId = setInterval(() => {
      dispatch(fetchOrderBook("BTCUSDT"));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  // Перетворюємо дані для графіка
  const formatData = (orders) => {
    return orders.slice(0, 20).map(([price, amount]) => ({
      price: parseFloat(price),
      amount: parseFloat(amount),
    }));
  };

  const bidData = formatData(bids);
  const askData = formatData(asks);

  return (
    <div>
      <h3>Глибина ринку</h3>
      <LineChart width={700} height={300}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="price" type="number" domain={["auto", "auto"]} />
        <YAxis />
        <Tooltip />
        <Line
          data={bidData}
          type="monotone"
          dataKey="amount"
          stroke="#00c853"
          name="Bids"
        />
        <Line
          data={askData}
          type="monotone"
          dataKey="amount"
          stroke="#d50000"
          name="Asks"
        />
      </LineChart>
    </div>
  );
};

export default OrderBookChart;
