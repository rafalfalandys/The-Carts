import { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import classes from "./Main.module.scss";

import CartList from "./List/CartList";
import CartDetails from "./Details/CartDetails";
import { URL } from "../config";

function Main() {
  const loaderData = useLoaderData();

  return (
    <Fragment>
      <main className={classes.main}>
        <CartList carts={loaderData} />
        <CartDetails carts={loaderData} />
      </main>
    </Fragment>
  );
}

export default Main;

export const loader = async () => {
  const res = await fetch(URL);
  if (!res.ok) throw new Error("Could not fetch carts data");

  const data = await res.json();

  return data.carts;
};
