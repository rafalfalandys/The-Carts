import { Fragment, useCallback, useEffect, useState } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import classes from "./MainPage.module.scss";

import CartList from "../components/List/CartList";
import { URL } from "../config";

function MainPage() {
  const loaderData = useLoaderData();
  const [carts, setCarts] = useState(loaderData);
  const submit = useSubmit();

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

  const deleteCart = (id) => {
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
    submit({ id }, { method: "delete" });
  };

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
////////////// ACTION FUNCTIONS /////////////
/////////////////////////////////////////////

export const loader = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Could not fetch carts data");

  const data = await res.json();

  return data.carts;
};

export const action = async ({ request }) => {
  try {
    const data = await request.formData();
    const id = +data.get("id");
    const localCarts = JSON.parse(localStorage.getItem("new-carts"));
    const localRemovedCarts = JSON.parse(localStorage.getItem("removed-carts"));

    // case 1 = deleted cart is part of local storage
    if (
      localCarts &&
      localCarts.filter((cart) => cart.id === id).length !== 0
    ) {
      const newLocalData = localCarts.filter((cart) => cart.id !== id);
      localStorage.setItem("new-carts", JSON.stringify(newLocalData));
    }

    // case 2 = deleted cart is part of API data
    if (
      !localCarts ||
      localCarts.filter((cart) => cart.id === id).length === 0
    ) {
      const newRemovedCarts = localRemovedCarts
        ? [...localRemovedCarts, id]
        : [id];
      localStorage.setItem("removed-carts", JSON.stringify(newRemovedCarts));
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
