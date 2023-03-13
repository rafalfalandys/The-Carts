import CartCard from "./CartCard";
import classes from "./CartList.module.scss";
import NewCartBtn from "./NewCartBtn";

function CartList({ carts }) {
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
      <NewCartBtn />
      {cartsList}
    </ul>
  );
}

export default CartList;
