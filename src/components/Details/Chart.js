import { Fragment } from "react";
import classes from "./Chart.module.scss";

function Chart(props) {
  return (
    <div className={classes.chart}>
      <h2 className={classes.placeholder}>
        {!props.cart && (
          <p>Click on one of the carts to display the products price chart</p>
        )}
      </h2>
      {props.cart && (
        <Fragment>
          <header className={classes.header}>
            <ion-icon name="cart-outline" size="large" />
            <h2> &nbsp;Cart {props.cart.id}</h2>
          </header>
        </Fragment>
      )}
    </div>
  );
}

export default Chart;
