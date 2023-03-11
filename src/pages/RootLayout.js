import { Fragment } from "react";
import { Link } from "react-router-dom";
import Main from "../components/Main";
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
      <Main />
    </Fragment>
  );
}

export default RootLayout;
