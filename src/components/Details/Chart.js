import { Fragment } from "react";
import { createPriceRange } from "../../helper";
import classes from "./Chart.module.scss";

function Chart(props) {
  const drawChart = () => {
    if (!props.cart) return;
    const allPrices = props.cart.products.map((prod) => prod.price);
    const maxRange = createPriceRange(allPrices)[1];

    const originalPrices = props.cart.products.map((prod) => {
      const moveValue = (20 / maxRange) * prod.price;
      return (
        <div
          key={prod.id}
          className={classes.dot}
          style={{ transform: `translateY(-${moveValue}rem)` }}
        ></div>
      );
    });

    const discountedPrices = props.cart.products.map((prod) => {
      const discountedPrice =
        (prod.price / 100) * (100 - prod.discountPercentage);
      const moveValue = (20 / maxRange) * discountedPrice;
      return (
        <div
          key={prod.id}
          className={`${classes.dot} ${classes["dot--discounted"]}`}
          style={{ transform: `translateY(-${moveValue}rem)` }}
        ></div>
      );
    });

    return [originalPrices, discountedPrices, maxRange];
  };

  const [originalPrices, discountedPrices, maxRange] = props.cart
    ? drawChart()
    : [null, null, null];

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.placeholder}>
        {!props.cart && (
          <p>Click on one of the carts to display the products price chart</p>
        )}
      </h2>
      {props.cart && (
        <Fragment>
          <header className={classes.header}>
            <ion-icon name="cart-outline" size="large" />
            <h2> &nbsp;Cart {props.cart.id} - Prices Chart</h2>
          </header>
          <div className={classes.chart}>
            <div
              className={`${classes.line} ${classes["line-vertical"]}`}
            ></div>
            <div
              className={`${classes.line} ${classes["line-horizontal"]}`}
            ></div>
            <h2 className={classes["price-text"]}>Price</h2>
            <h2
              className={`${classes["price__value"]} ${classes["price__value--min"]}`}
            >
              0
            </h2>
            <h2
              className={`${classes["price__value"]} ${classes["price__value--max"]}`}
            >
              {maxRange}
            </h2>

            <div className={classes.dots}>{originalPrices}</div>
            <div className={classes.dots}>{discountedPrices}</div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Chart;
