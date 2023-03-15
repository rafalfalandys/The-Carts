import { Cart } from "../../types";
import CartCard from "./CartCard";
import classes from "./CartList.module.scss";

import NewCartBtn from "./NewCartBtn";

const CartList: React.FC<{ carts: Cart[] }> = ({ carts }) => {
  const cartsList = carts?.map((cart, i) => (
    <CartCard
      key={cart.id}
      id={cart.id}
      total={cart.total}
      discountedTotal={cart.discountedTotal}
      products={cart.products}
      totalQuantity={cart.totalQuantity}
    />
  ));

  return (
    <ul className={classes.list}>
      {cartsList}
      <NewCartBtn />
    </ul>
  );
};

export default CartList;
