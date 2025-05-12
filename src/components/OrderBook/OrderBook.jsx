import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderBook } from "../../redux/orderBook/operations";
import css from "./OrderBook.module.css";

const OrderBook = () => {
  const dispatch = useDispatch();
  const { bids, asks, loading, error } = useSelector(
    (state) => state.orderBook
  );

  useEffect(() => {
    dispatch(fetchOrderBook("ATOMUSDT")).then((res) => {
      console.log("Order Book Data:", res);
    });

    const intervalId = setInterval(() => {
      dispatch(fetchOrderBook("ATOMUSDT"));
    }, 1000); // оновлення кожні 5 секунд

    return () => clearInterval(intervalId); // очищення інтервалу при розмонтуванні компонента
  }, [dispatch]);

  return (
    <div>
      <h2>Order Book</h2>
      {/*loading && <p>Loading...</p>*/}
      {error && <p>Error: {error}</p>}
      <div className={css.box}>
        <div>
          <h3>Bids</h3>
          <ul>
            {bids.map((bid, i) => (
              <li key={i}>
                {bid[0]} - {bid[1]}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Asks</h3>
          <ul>
            {asks.map((ask, i) => (
              <li key={i}>
                {ask[0]} - {ask[1]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
