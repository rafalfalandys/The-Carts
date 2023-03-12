import { Fragment } from "react";
import { useParams } from "react-router-dom";
import classes from "./CartDetails.module.scss";

import Chart from "./Chart";
import NewCartForm from "./Form/NewCartForm";
import Products from "./Products";

function CartDetails(props) {
  const params = useParams();
  const cart = props.carts.filter((cart) => cart.id === +params.cartId)[0];

  return (
    <div className={classes.details}>
      {params.cartId !== "new-cart" && (
        <Fragment>
          <Products cart={cart} />
          <Chart cart={cart} />
        </Fragment>
      )}
      {params.cartId === "new-cart" && <NewCartForm />}
    </div>
  );
}

export default CartDetails;
