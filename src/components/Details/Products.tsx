import { Fragment } from "react";
import classes from "./Products.module.scss";

import Table from "./Table";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Cart } from "../../types";

const Products: React.FC<{ cart: Cart }> = (props) => {
  return (
    <div className={classes.products}>
      <Fragment>
        <header className={classes.header}>
          {/* <ion-icon name="cart-outline" size="large" /> */}
          <ShoppingCartIcon />
          <h2> &nbsp;Cart {props.cart.id} - Products</h2>
        </header>
        <Table cart={props.cart} />
      </Fragment>
    </div>
  );
};

export default Products;
