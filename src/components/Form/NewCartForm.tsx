import { useEffect, useState } from "react";
import {
  ActionFunction,
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import classes from "./NewCartForm.module.scss";

import { Cart, Product } from "../../types";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import SingleProdForm from "./SingleProdForm";

const NewCartForm: React.FC = () => {
  const [productsIDs, setProductsIDs] = useState<number[]>([]);
  // POST request for creating new cart triggers an action function which feed component with added cart object:
  const actionData = useActionData() as Cart;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { onAddCartHandler, carts } = useOutletContext() as {
    carts: Cart[];
    onAddCartHandler: (cart: Cart) => void;
  };

  // receving cart object from action data triggers adding cart to our frontend, and navigates to new cart details
  useEffect(() => {
    if (actionData) {
      onAddCartHandler(actionData);
      navigate(`/${actionData.id}`);
    }
  }, [actionData, onAddCartHandler, navigate]);

  // checking navigtion state in order to show 'uploading...' message
  const isUploading =
    navigation.state === "submitting" || navigation.state === "loading";

  // remove product handler
  const removeProdHandler: (prodId: number) => void = (prodId) => {
    setProductsIDs((prev) => prev.filter((id) => id !== prodId));
  };

  // add product handler
  const onAddProdHandler = () => {
    const newIndex =
      productsIDs.length === 0 ? 0 : Math.max(...productsIDs) + 1;
    setProductsIDs((prev) => [...prev, newIndex]);
  };

  // checking whats the last cart, so the new one get proper name
  const maxCartId = Math.max(...carts.map((cart) => cart.id));

  const productsList = productsIDs.map((prodId) => (
    <SingleProdForm
      key={prodId}
      id={prodId}
      removeProdHandler={removeProdHandler}
    />
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
        <PlusCircleIcon />
        <span>Add Product</span>
      </div>

      {productsIDs.length !== 0 && (
        <div className={classes["buttons__submit"]}>
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
////// ACTION FUNCTION - adding cart ///////
////////////////////////////////////////////

// building products array
const buildProductsArr: (data: FormData) => Product[] = (data) => {
  const discountPercentages = data.getAll("discount-percentage");
  const discountPrices = data.getAll("discount-price");
  const prices = data.getAll("price");
  const quantities = data.getAll("qty");
  const titles = data.getAll("title");
  const totals = data.getAll("total");

  return titles.map((title, i) => {
    return {
      discountPercentage: +discountPercentages[i],
      discountedPrice: +discountPrices[i] * +quantities[i],
      id: i,
      price: +prices[i],
      quantity: +quantities[i],
      title: title,
      total: +totals[i],
    };
  }) as Product[];
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const reqData = await request.formData();
    const productsArr = buildProductsArr(reqData);

    const id = +reqData.get("cart-id")!;

    const discountedTotal = productsArr
      .map((prod: Product) => prod.discountedPrice)
      .reduce((acc: number, cur: number) => acc + cur);

    const total = productsArr
      .map((prod: Product) => prod.price * prod.quantity)
      .reduce((acc: number, cur: number) => acc + cur);

    const totalQuantity = productsArr
      .map((prod: Product) => prod.quantity)
      .reduce((acc: number, cur: number) => acc + cur);

    // building cart object
    const cartObj: Cart = {
      id,
      discountedTotal,
      products: productsArr,
      total,
      totalProducts: productsArr.length,
      totalQuantity,
      userId: 77,
    };

    const res = await fetch("https://dummyjson.com/carts/add", {
      method: request.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartObj),
    });

    if (!res.ok) throw new Error("Could not create new cart!");

    // handling local storage
    const curStorageJson = localStorage.getItem("new-carts");
    const curStorage = curStorageJson ? JSON.parse(curStorageJson) : "";
    const newCarts = curStorage ? [...curStorage, cartObj] : [cartObj];
    localStorage.setItem("new-carts", JSON.stringify(newCarts));

    // returning cart object triggers adding one to our front end. I do not return the object coming as a response from API because its ID is always '21' and I want it to be dynamic
    return cartObj;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};
