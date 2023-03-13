import { Fragment, useCallback, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import classes from "./MainPage.module.scss";

import CartList from "../components/List/CartList";
import { URL } from "../config";

function MainPage() {
  const loaderData = useLoaderData();
  const [carts, setCarts] = useState(loaderData);

  // handling local storage
  useEffect(() => {
    const localCarts = JSON.parse(localStorage.getItem("new-carts"));
    const localRemovedCarts = JSON.parse(localStorage.getItem("removed-carts"));

    // adding local carts
    if (localCarts && localCarts.length !== 0)
      setCarts((prev) => [...prev, ...localCarts]);

    // removing carts
    if (localRemovedCarts && localRemovedCarts.length !== 0) {
      setCarts((prev) =>
        prev.filter((cart) =>
          localRemovedCarts
            .map((id) => cart.id !== id)
            .reduce((acc, cur) => acc && cur)
        )
      );
    }
  }, []);

  const onAddCartHandler = useCallback((cart) => {
    setCarts((prev) => [...prev, cart]);
  }, []);

  const deleteCart = useCallback((id) => {
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
  }, []);

  return (
    <Fragment>
      <main className={classes.main}>
        <CartList carts={carts} />
        <Outlet
          context={{ onAddCartHandler, onDeleteCart: deleteCart, carts }}
        />
      </main>
    </Fragment>
  );
}

export default MainPage;

/////////////////////////////////////////////
////////////// LOADER FUNCTION //////////////
/////////////////////////////////////////////

export const loader = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Could not fetch carts data");

  const data = await res.json();

  return data.carts;
};
