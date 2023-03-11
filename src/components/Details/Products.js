import { Fragment } from "react";
import classes from "./Products.module.scss";
import Table from "./Table";

function Products(props) {
  return (
    <div className={classes.products}>
      <h2 className={classes.placeholder}>
        {!props.cart && (
          <p>
            Click on one of the carts to display its details, or start adding
            new cart to display the new cart form
          </p>
        )}
      </h2>
      {props.cart && (
        <Fragment>
          <header className={classes.header}>
            <ion-icon name="cart-outline" size="large" />
            <h2> &nbsp;Cart {props.cart.id}</h2>
          </header>
          <Table cart={props.cart} />
        </Fragment>
      )}
    </div>
  );
}

export default Products;
