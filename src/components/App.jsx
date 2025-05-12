import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderBook } from "../redux/orderBook/operations";
import "./App.css";
import OrderBook from "./OrderBook/OrderBook";
import OrderBookChart from "./OrderBookChart/OrderBookChart";
import TradeVolumeTracker from "./TradeVolumeTracker/TradeVolumeTracker";
import VolumeChart from "./VolumeChart/VolumeChart";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchOrderBook("ATOMUSDT"));
    }, 3000); // оновлення кожні 3 секунди

    return () => clearInterval(interval);
  }, [dispatch]);
  return (
    <>
      <h2>Биржевой стакан</h2>
      {/*<TradeVolumeTracker />*/}
      <VolumeChart />
      <OrderBook />
    </>
  );
};

export default App;
