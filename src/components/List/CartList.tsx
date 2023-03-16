import classes from "./CartList.module.scss";

import { Cart } from "../../types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import CartCard from "./CartCard";
import NewCartBtn from "./NewCartBtn";

const CartList: React.FC<{
  carts: Cart[];
  listVisibilityHandler: (isVisible: boolean) => void;
  isListVisible: boolean;
}> = ({ carts, listVisibilityHandler, isListVisible }) => {
  // click on cart thumbnail on phone:
  const onClickCartHandler: (isVisible: boolean) => void = (isVisible) => {
    if (window.innerWidth > 600)
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    else window.scroll(0, 0);
    listVisibilityHandler(isVisible);
  };

  // click handler of little arrow toggling the carts bar
  const onListToggleHandler = () => {
    listVisibilityHandler(!isListVisible);
  };

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

  return (
    <ul className={`${classes.wrapper} ${isListVisible ? "" : classes.hidden}`}>
      <div
        className={classes.list}
        onClick={onClickCartHandler.bind(null, false)}
      >
        {cartsList}
        <NewCartBtn />
      </div>
      <div
        className={`${classes["toggle-btn"]} ${
          isListVisible ? "" : classes.rotated
        }`}
        onClick={onListToggleHandler}
      >
        <ChevronLeftIcon />
      </div>
    </ul>
  );
};

export default CartList;
