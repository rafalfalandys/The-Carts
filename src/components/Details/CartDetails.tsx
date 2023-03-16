import { Fragment, useEffect, useState } from "react";
import {
  ActionFunction,
  useFetcher,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import classes from "./CartDetails.module.scss";

import { URL } from "../../config";
import { Cart } from "../../types";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { getLocalData } from "../../helper";

import Products from "./Products";
import ReChart from "./ReChart";

const CartDetails: React.FC = () => {
  const params = useParams();
  const { carts, onDeleteCart, apiCartsNo } = useOutletContext() as {
    carts: Cart[];
    onDeleteCart: (id: number) => void;
    apiCartsNo: number;
  };
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [noCartMsg, setNoCartMsg] = useState("");

  const cart: Cart = carts?.filter(
    (cart: Cart) => cart.id === +params.cartId!
  )[0];

  const deleteCartHandler = () => {
    const areYouSure = window.confirm(
      `Are you sure you want to delete cart ${cart.id}?`
    );
    if (areYouSure)
      fetcher.submit(
        { id: `${cart.id}`, apiCartsNo: `${apiCartsNo}` },
        { method: "delete" }
      );
  };

  // I delay this message because it blinked after deleting the cart
  if (!cart)
    setTimeout(() => {
      setNoCartMsg("There is no such cart.");
    }, 1500);

  // if delete request is ok, ID is passed and triggers deleting cart and navigates to home page
  useEffect(() => {
    const id: number = fetcher.data;
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
            <XCircleIcon />
          </div>
          <ReChart cart={cart} />
          <Products cart={cart} />
        </Fragment>
      )}
      {!cart && <h1 className={classes.placeholder}>{noCartMsg}</h1>}
    </div>
  );
};

export default CartDetails;

/////////////////////////////////////////////
/////// ACTION FUNCTION - delete cart ///////
/////////////////////////////////////////////

export const action: ActionFunction = async ({ request }) => {
  try {
    const data = await request.formData();
    const id = +data.get("id")!;
    const apiCartsNo = +data.get("apiCartsNo")!;

    // checking if deleting cart comes from API or local storage. As api has some number of carts - what's above that number comes from local storage
    if (id <= apiCartsNo) {
      const res = await fetch(URL + `${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete the cart");
    }

    // retrieving local data
    const { localCarts, localRemovedCarts } = getLocalData();

    // case 1 = deleted cart is part of local storage
    if (
      localCarts &&
      localCarts.filter((cart: Cart) => cart.id === id).length !== 0
    ) {
      const newLocalData = localCarts.filter((cart: Cart) => cart.id !== id);
      localStorage.setItem("new-carts", JSON.stringify(newLocalData));
    }

    // case 2 = deleted cart is part of API data
    if (
      !localCarts ||
      localCarts.filter((cart: Cart) => cart.id === id).length === 0
    ) {
      const newRemovedCarts = localRemovedCarts
        ? [...localRemovedCarts, id]
        : [id];
      localStorage.setItem("removed-carts", JSON.stringify(newRemovedCarts));
    }

    // once local data is managed, returning id triggers deleting the proper cart from our frontend
    return id;
  } catch (error) {
    console.log(error);
    throw Error(`${error}`);
  }
};
