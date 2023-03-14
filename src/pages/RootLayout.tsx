import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "./RootLayout.module.scss";

function RootLayout() {
  return (
    <Fragment>
      <header>
        <Link to="/" className={classes.header}>
          <div className={classes.icon}>
            <ion-icon name="cart-outline" />
          </div>
          &nbsp; The Carts!
        </Link>
      </header>
      <Outlet />
    </Fragment>
  );
}

export default RootLayout;
