import { Fragment } from "react";
import classes from "./Products.module.scss";
import Table from "./Table";

function Products(props) {
  const deleteCartHandler = () => {
    const areYouSure = window.confirm(
      `Are you sure you want to delete cart ${props.cart.id}?`
    );
    if (areYouSure) {
      props.onDeleteCart(props.cart.id);
    }
  };

  return (
    <div className={classes.products}>
      <Fragment>
        <header className={classes.header}>
          <ion-icon name="cart-outline" size="large" />
          <h2> &nbsp;Cart {props.cart.id}</h2>
        </header>
        <Table cart={props.cart} />
        <div className={classes.btn} onClick={deleteCartHandler}>
          <span>Delete Cart&nbsp;</span>
          <ion-icon name="close-circle-outline" />
        </div>
      </Fragment>
    </div>
  );
}

export default Products;
