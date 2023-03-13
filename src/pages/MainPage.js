import { Fragment, useCallback, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import classes from "./MainPage.module.scss";

import CartList from "../components/List/CartList";
import { URL } from "../config";

function MainPage() {
  const loaderData = useLoaderData();
  const [carts, setCarts] = useState(loaderData);

  useEffect(() => {
    const localCarts = JSON.parse(localStorage.getItem("new-carts"));
    if (localCarts) setCarts((prev) => [...prev, ...localCarts]);
  }, []);

  const onAddCartHandler = useCallback((cart) => {
    setCarts((prev) => [...prev, cart]);
  }, []);

  return (
    <Fragment>
      <main className={classes.main}>
        <CartList carts={carts} />
        <Outlet context={{ onAddCartHandler, carts }} />
      </main>
    </Fragment>
  );
}

export default MainPage;

export const loader = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Could not fetch carts data");

  const data = await res.json();

  return data.carts;
};
