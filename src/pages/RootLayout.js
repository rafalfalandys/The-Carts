import { Fragment } from "react";
import Main from "../components/Main";
import classes from "./RootLayout.module.scss";

function RootLayout() {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.icon}>
          <ion-icon name="cart-outline" />
        </div>
        &nbsp; The Carts!
      </header>
      <Main />
    </Fragment>
  );
}

export default RootLayout;
