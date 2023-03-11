import { useCallback, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { URL } from "../../config";
import CartCard from "./CartCard";
import classes from "./CartList.module.scss";

function CartList() {
  const loaderData = useLoaderData();
  console.log(loaderData[0]);
  const [carts, setCarts] = useState(loaderData);

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

export const loader = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Could not fetch carts data");

  const data = await res.json();

  return data.carts;
};
