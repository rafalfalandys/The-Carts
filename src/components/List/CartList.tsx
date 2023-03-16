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
  // click on cart thumbanil on phone:
  const onClickCartHandler: (isVisible: boolean) => void = (isVisible) => {
    if (window.innerWidth > 600)
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    else window.scroll(0, 0);
    listVisibilityHandler(isVisible);
  };

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
