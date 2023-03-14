import { Fragment, useEffect, useState } from "react";
import {
  useFetcher,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { URL } from "../../config";
import classes from "./CartDetails.module.scss";
import Products from "./Products";
import ReChart from "./ReChart";

function CartDetails() {
  const params = useParams();
  const { carts, onDeleteCart } = useOutletContext();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [noCartMsg, setNoCartMsg] = useState("");

  const cart = carts?.filter((cart) => cart.id === +params.cartId)[0];

  const deleteCartHandler = () => {
    const areYouSure = window.confirm(
      `Are you sure you want to delete cart ${cart.id}?`
    );
    if (areYouSure) fetcher.submit({ id: cart.id }, { method: "delete" });
  };

  // I delay this message because it blinked after deleting the cart
  if (!cart)
    setTimeout(() => {
      setNoCartMsg("There is no such cart.");
    }, 1000);

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
          <div className={classes.btn} onClick={deleteCartHandler}>
            <span>Delete Cart&nbsp;</span>
            <ion-icon name="close-circle-outline" />
          </div>
          <ReChart cart={cart} />
          <Products cart={cart} />
        </Fragment>
      )}
      {!cart && <h1 className={classes.placeholder}>{noCartMsg}</h1>}
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
