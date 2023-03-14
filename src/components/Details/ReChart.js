import { Fragment } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import classes from "./ReChart.module.scss";
import { createPriceRange } from "../../helper";

function ReChart({ cart }) {
  const chartData = cart.products.map((prod, i) => {
    return {
      name: `Product ${i}`,
      price: prod.price.toFixed(2),
      discPrice: (prod.discountedPrice / prod.quantity).toFixed(2),
    };
  });

  console.log(cart.products);

  const allPrices = cart.products.map((prod) => prod.price);
  const priceRange = createPriceRange(allPrices);

  const chart = (
    <ResponsiveContainer>
      <LineChart data={chartData}>
        <Line type="linear" dataKey="price" stroke="#505050" strokeWidth="2" />
        <Line
          type="linear"
          dataKey="discPrice"
          stroke="#394FF0"
          strokeWidth="2"
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis tickFormatter={(val) => `$${val}`} domain={priceRange} />
        <Tooltip />
        <Legend
          formatter={(val, entry, index) => {
            return index === 0 ? "Original Price" : "Discounted Price";
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className={classes.wrapper}>
      <Fragment>
        <header className={classes.header}>
          <ion-icon name="cart-outline" size="large" />
          <h2> &nbsp;Cart {cart.id} - Prices Chart</h2>
        </header>
        <div className={classes.chart}>{chart}</div>
      </Fragment>
    </div>
  );
}

export default ReChart;
