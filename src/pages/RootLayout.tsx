import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import classes from "./RootLayout.module.scss";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function RootLayout() {
  return (
    <Fragment>
      <header className={classes["header__wrapper"]}>
        <Link to="/" className={classes.header}>
          <div className={classes.icon}>
            {/* <ion-icon name="cart-outline" /> */}
            <ShoppingCartIcon />
          </div>
          &nbsp; The Carts!
        </Link>
      </header>
      <Outlet />
    </Fragment>
  );
}

export default RootLayout;
