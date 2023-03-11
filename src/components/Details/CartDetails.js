import { useParams } from "react-router-dom";
import classes from "./CartDetails.module.scss";

import Chart from "./Chart";
import Products from "./Products";

function CartDetails(props) {
  const params = useParams();
  const cart = props.carts.filter((cart) => cart.id === +params.cartId)[0];

  return (
    <div className={classes.details}>
      <Products cart={cart} />
      <Chart cart={cart} />
    </div>
  );
}

export default CartDetails;
