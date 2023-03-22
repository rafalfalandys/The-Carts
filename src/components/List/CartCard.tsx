import { Link, useParams } from "react-router-dom";
import classes from "./CartCard.module.scss";

import { Product } from "../../types";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const CartCard: React.FC<{
  id: number;
  total: number;
  discountedTotal: number;
  products: Product[];
  totalQuantity: number;
}> = (props) => {
  const params = useParams();
  const discount = props.total - props.discountedTotal;

  // checking if current card is the one being displayed in details to highlight it. I could have used navLink. But I have not.
  const isActive = +params.cartId! === props.id;

  return (
    <li className={classes.wrapper}>
      <Link
        to={`${props.id}`}
        className={`${classes.cart} ${isActive ? classes.active : ""}`}
        aria-label="cart thumbnail"
      >
        <header className={classes.header}>
          <ShoppingCartIcon />
          <h2> &nbsp;Cart {props.id}</h2>
        </header>
        <p>{props.totalQuantity} items</p>
        <p>
          <strong>${discount.toFixed(0)}</strong> discount
        </p>
        <div className={classes.price}>
          <h3 className={classes.total}>${props.total.toFixed(0)}</h3>
          <h3 className={classes["total-discount"]}>
            ${props.discountedTotal.toFixed(0)}
          </h3>
        </div>
      </Link>
    </li>
  );
};

export default CartCard;
