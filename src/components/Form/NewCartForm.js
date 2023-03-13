import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import classes from "./NewCartForm.module.scss";
import SingleProdForm from "./SingleProdForm";

function NewCartForm() {
  const [productsIDs, setProductsIDs] = useState([]);
  const actionData = useActionData();
  const navigation = useNavigation();
  const { onAddCartHandler, carts } = useOutletContext();

  useEffect(() => {
    if (actionData) onAddCartHandler(actionData);
  }, [actionData, onAddCartHandler]);

  const isUploading =
    navigation.state === "submitting" || navigation.state === "loading";

  const maxCartId = Math.max(...carts.map((cart) => cart.id));

  const removeProd = (prodId) => {
    setProductsIDs((prev) => prev.filter((id) => id !== prodId));
  };

  const onAddProdHandler = () => {
    const newIndex =
      productsIDs.length === 0 ? 0 : Math.max(...productsIDs) + 1;
    setProductsIDs((prev) => [...prev, newIndex]);
  };

  const saveFormHandler = () => {};

  const productsList = productsIDs.map((prodId) => (
    <SingleProdForm key={prodId} id={prodId} removeProdHandler={removeProd} />
  ));

  return (
    <Form className={classes.form} method={"post"}>
      <header className={classes.header}>
        <label>Cart </label>
        <input
          className={classes.metadata}
          name="cart-id"
          value={maxCartId + 1}
          readOnly
        ></input>
      </header>

      {productsList}

      <div
        className={`${classes["btn--add-prod"]} ${classes.btn}`}
        onClick={onAddProdHandler}
      >
        <ion-icon name="add-circle-outline" />
        <span>Add Product</span>
      </div>

      {productsIDs.length !== 0 && (
        <div className={classes["buttons__submit"]}>
          <div
            className={`${classes.btn} ${classes["btn--save"]}`}
            onClick={saveFormHandler}
          >
            Save for later
          </div>
          <button className={`${classes.btn} ${classes["btn--submit"]}`}>
            {!isUploading && <span> Add Cart</span>}
            {isUploading && <span> Uploading...</span>}
          </button>
        </div>
      )}
    </Form>
  );
}

export default NewCartForm;

////////////////////////////////////////////
//////////// ACTION FUNCTIONS //////////////
////////////////////////////////////////////

const buildProductsArr = async (data) => {
  const discountPercentages = data.getAll("discount-percentage");
  const discountPrices = data.getAll("discount-price");
  const prices = data.getAll("price");
  const quantities = data.getAll("qty");
  const titles = data.getAll("title");
  const totals = data.getAll("total");

  return titles.map((title, i) => {
    return {
      discountPercentage: +discountPercentages[i],
      discountPrice: +discountPrices[i],
      id: i,
      price: +prices[i],
      quantity: +quantities[i],
      title: title,
      total: +totals[i],
    };
  });
};

export const action = async ({ request }) => {
  try {
    const reqData = await request.formData();
    const productsArr = await buildProductsArr(reqData);

    const discountedTotal = productsArr
      .map((prod) => prod.discountPrice)
      .reduce((acc, cur) => acc + cur)
      .toFixed(0);

    const total = productsArr
      .map((prod) => prod.price)
      .reduce((acc, cur) => acc + cur)
      .toFixed(0);

    const totalQuantity = productsArr
      .map((prod) => prod.quantity)
      .reduce((acc, cur) => acc + cur);

    const cartObj = {
      id: +reqData.get("cart-id"),
      discountedTotal,
      products: productsArr,
      total,
      totalProducts: productsArr.length,
      totalQuantity,
      userId: 97,
    };

    const res = await fetch("https://dummyjson.com/carts/add", {
      method: request.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartObj),
    });

    if (!res.ok) throw new Error("Could not create new cart!");

    // const data = await res.json();

    const curStorage = JSON.parse(localStorage.getItem("new-carts"));
    const newCarts = curStorage ? [...curStorage, cartObj] : [cartObj];
    localStorage.setItem("new-carts", JSON.stringify(newCarts));

    return cartObj;
  } catch (error) {
    throw new Error(error);
  }
};
