import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { Cart, Product } from "../../types";
import classes from "./NewCartForm.module.scss";
import SingleProdForm from "./SingleProdForm";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const NewCartForm: React.FC = () => {
  const [productsIDs, setProductsIDs] = useState<number[]>([]);
  const actionData = useActionData() as Cart;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { onAddCartHandler, carts } = useOutletContext() as {
    carts: Cart[];
    onAddCartHandler: (cart: Cart) => void;
  };

  useEffect(() => {
    if (actionData) {
      onAddCartHandler(actionData);
      navigate(`/${actionData.id}`);
    }
  }, [actionData, onAddCartHandler, navigate]);

  const isUploading =
    navigation.state === "submitting" || navigation.state === "loading";

  const maxCartId = Math.max(...carts.map((cart) => cart.id));

  const removeProd: (prodId: number) => void = (prodId) => {
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
        {/* <ion-icon name="add-circle-outline" /> */}
        <PlusCircleIcon />
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
};

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

  return titles.map((title: string, i: number) => {
    return {
      discountPercentage: +discountPercentages[i],
      discountedPrice: +discountPrices[i],
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

    const id = +reqData.get("cart-id");

    const discountedTotal = productsArr
      .map((prod: Product) => prod.discountedPrice)
      .reduce((acc: number, cur: number) => acc + cur)
      .toFixed(0);

    const total = productsArr
      .map((prod: Product) => prod.price)
      .reduce((acc: number, cur: number) => acc + cur)
      .toFixed(0);

    const totalQuantity = productsArr
      .map((prod: Product) => prod.quantity)
      .reduce((acc: number, cur: number) => acc + cur);

    const cartObj = {
      id,
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

    const curStorageJson = localStorage.getItem("new-carts");
    const curStorage = curStorageJson ? JSON.parse(curStorageJson) : "";
    const newCarts = curStorage ? [...curStorage, cartObj] : [cartObj];
    localStorage.setItem("new-carts", JSON.stringify(newCarts));

    console.log(cartObj);
    return cartObj;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
