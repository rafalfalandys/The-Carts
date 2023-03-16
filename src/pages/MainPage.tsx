import { Fragment, useCallback, useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import classes from "./MainPage.module.scss";

import CartList from "../components/List/CartList";
import { URL } from "../config";
import { Cart } from "../types";
import { getLocalData } from "../helper";

const MainPage: React.FC = () => {
  const loaderData = useLoaderData() as Cart[];
  const [carts, setCarts] = useState(loaderData);
  const [isListVisible, setIsListVisible] = useState(false);

  // handling local storage
  useEffect(() => {
    const { localCarts, localRemovedCarts } = getLocalData();

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

  const onAddCartHandler = useCallback((cart: Cart) => {
    setCarts((prev) => [...prev, cart]);
  }, []);

  const deleteCart = useCallback((id: number) => {
    setCarts((prev) => prev.filter((cart) => cart.id !== id));
  }, []);

  const listVisibilityHandler: (isVisible: boolean) => void = (isVisible) => {
    setIsListVisible(isVisible);
  };

  return (
    <Fragment>
      <main className={classes.main}>
        <CartList
          carts={carts}
          listVisibilityHandler={listVisibilityHandler}
          isListVisible={isListVisible}
        />
        <Outlet
          context={{
            onAddCartHandler,
            onDeleteCart: deleteCart,
            carts,
          }}
        />
        <div
          className={`${classes.overlay} ${
            isListVisible ? "" : classes.hidden
          }`}
        ></div>
      </main>
    </Fragment>
  );
};

export default MainPage;

/////////////////////////////////////////////
////////////// LOADER FUNCTION //////////////
/////////////////////////////////////////////

export const loader = async () => {
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error("Could not fetch carts data");

    const data = await res.json();

    return data.carts as Cart[];
  } catch (error) {
    throw Error(`${error}`);
  }
};
