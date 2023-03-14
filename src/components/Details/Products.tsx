import { Fragment } from "react";
import classes from "./Products.module.scss";
import Table from "./Table";

type Cart = {
  discountedTotal: number;
  id: number;
  products: {
    discountedPercentage: number;
    discountedPrice: number;
    id: number;
    price: number;
    quantity: number;
    title: string;
    total: number;
  }[];
  total: number;
  totalProducts: 5;
  totalQuantity: number;
  userId: number;
};

const Products: React.FC<{ cart: Cart }> = (props) => {
  return (
    <div className={classes.products}>
      <Fragment>
        <header className={classes.header}>
          <ion-icon name="cart-outline" size="large" />
          <h2> &nbsp;Cart {props.cart.id} - Products</h2>
        </header>
        <Table cart={props.cart} />
      </Fragment>
    </div>
  );
};

export default Products;
