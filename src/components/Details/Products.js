import { Fragment } from "react";
import classes from "./Products.module.scss";
import Table from "./Table";

function Products(props) {
  return (
    <div className={classes.products}>
      <Fragment>
        <header className={classes.header}>
          <ion-icon name="cart-outline" size="large" />
          <h2> &nbsp;Cart {props.cart.id}</h2>
        </header>
        <Table cart={props.cart} />
      </Fragment>
    </div>
  );
}

export default Products;
