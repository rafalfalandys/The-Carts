import { Fragment } from "react";
import classes from "./Products.module.scss";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Cart } from "../../types";

import Table from "./Table";

const Products: React.FC<{ cart: Cart }> = (props) => {
  return (
    <div className={classes.products}>
      <Fragment>
        <header className={classes.header}>
          <ShoppingCartIcon />
          <h2> &nbsp;Cart {props.cart.id} - Products</h2>
        </header>
        <Table cart={props.cart} />
      </Fragment>
    </div>
  );
};

export default Products;
