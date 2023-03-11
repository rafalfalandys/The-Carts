import { useState } from "react";
import CartCard from "./CartCard";
import classes from "./CartList.module.scss";

function CartList(props) {
  const [carts, setCarts] = useState(props.carts);

  const cartsList = carts.map((cart) => (
    <CartCard
      key={cart.id}
      id={cart.id}
      total={cart.total}
      discountedTotal={cart.discountedTotal}
      products={cart.products}
      totalQuantity={cart.totalQuantity}
    />
  ));

  return <ul className={classes.list}>{cartsList}</ul>;
}

export default CartList;
