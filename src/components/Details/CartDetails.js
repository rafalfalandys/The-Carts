import { Fragment } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import classes from "./CartDetails.module.scss";

import Chart from "./Chart";
import Products from "./Products";

function CartDetails() {
  const params = useParams();
  const { carts } = useOutletContext();

  const cart = carts?.filter((cart) => cart.id === +params.cartId)[0];

  return (
    <div className={classes.details}>
      {cart && (
        <Fragment>
          <Products cart={cart} />
          <Chart cart={cart} />
        </Fragment>
      )}
      {!cart && <h1 className={classes.placeholder}>There is no such cart.</h1>}
    </div>
  );
}

export default CartDetails;
