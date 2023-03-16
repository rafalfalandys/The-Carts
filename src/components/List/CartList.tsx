import { Cart } from "../../types";
import CartCard from "./CartCard";
import classes from "./CartList.module.scss";

import NewCartBtn from "./NewCartBtn";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const CartList: React.FC<{
  carts: Cart[];
  listVisibilityHandler: (isVisible: boolean) => void;
  isListVisible: boolean;
}> = ({ carts, listVisibilityHandler, isListVisible }) => {
  const cartsList = carts?.map((cart) => (
    <CartCard
      key={cart.id}
      id={cart.id}
      total={cart.total}
      discountedTotal={cart.discountedTotal}
      products={cart.products}
      totalQuantity={cart.totalQuantity}
    />
  ));

  const onListVisibilityChange: (isVisible: boolean | null) => void = (
    isVisible = null
  ) => {
    if (isVisible) listVisibilityHandler(isVisible);
    else listVisibilityHandler(!isListVisible);
  };

  return (
    <ul className={`${classes.wrapper} ${isListVisible ? "" : classes.hidden}`}>
      <div
        className={classes.list}
        onClick={onListVisibilityChange.bind(null, false)}
      >
        {cartsList}
        <NewCartBtn />
      </div>
      <div
        className={`${classes["toggle-btn"]} ${
          isListVisible ? "" : classes.rotated
        }`}
        onClick={onListVisibilityChange.bind(null, null)}
      >
        <ChevronLeftIcon />
      </div>
    </ul>
  );
};

export default CartList;
