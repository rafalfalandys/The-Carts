import { Fragment } from "react";
import CartList from "./List/CartList";
import CartDetails from "./Details/CartDetails";
import classes from "./Main.module.scss";

function Main() {
  return (
    <Fragment>
      <main className={classes.main}>
        <CartList />
        <CartDetails />
      </main>
    </Fragment>
  );
}

export default Main;
