import { Fragment, useEffect } from "react";
import {
  useFetcher,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { URL } from "../../config";
import classes from "./CartDetails.module.scss";

import Chart from "./Chart";
import Products from "./Products";

function CartDetails() {
  const params = useParams();
  const { carts, onDeleteCart } = useOutletContext();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const cart = carts?.filter((cart) => cart.id === +params.cartId)[0];

  const deleteCartHandler = (id) =>
    fetcher.submit({ id }, { method: "delete" });

  useEffect(() => {
    const id = fetcher.data;
    if (id) {
      navigate("/");
      onDeleteCart(id);
    }
  }, [fetcher.data, onDeleteCart, navigate]);

  return (
    <div className={classes.details}>
      {cart && (
        <Fragment>
          <Products cart={cart} onDeleteCart={deleteCartHandler} />
          <Chart cart={cart} />
        </Fragment>
      )}
      {!cart && <h1 className={classes.placeholder}>There is no such cart.</h1>}
    </div>
  );
}

export default CartDetails;

/////////////////////////////////////////////
/////// ACTION FUNCTION - delete cart ///////
/////////////////////////////////////////////

export const action = async ({ request }) => {
  try {
    const data = await request.formData();
    const id = +data.get("id");

    if (id <= 20) {
      const res = await fetch(URL + `${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete the cart");
    }

    const localCarts = JSON.parse(localStorage.getItem("new-carts"));
    const localRemovedCarts = JSON.parse(localStorage.getItem("removed-carts"));

    // case 1 = deleted cart is part of local storage
    if (
      localCarts &&
      localCarts.filter((cart) => cart.id === id).length !== 0
    ) {
      const newLocalData = localCarts.filter((cart) => cart.id !== id);
      localStorage.setItem("new-carts", JSON.stringify(newLocalData));
    }

    // case 2 = deleted cart is part of API data
    if (
      !localCarts ||
      localCarts.filter((cart) => cart.id === id).length === 0
    ) {
      const newRemovedCarts = localRemovedCarts
        ? [...localRemovedCarts, id]
        : [id];
      localStorage.setItem("removed-carts", JSON.stringify(newRemovedCarts));
    }
    return id;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
