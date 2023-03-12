import { useRef, useState } from "react";
import classes from "./SingleProdForm.module.scss";

function SingleProdForm() {
  const nameRef = useRef();
  const qtyRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();

  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  // change input handlers
  const changeNameHandler = () => setName(nameRef.current.value);
  const changeQtyHandler = () => setQty(qtyRef.current.value);
  const changePriceHandler = () => setPrice(priceRef.current.value);
  const changeDiscountHandler = () => setDiscount(discountRef.current.value);

  // functions calculating rest values
  const countDiscUnitPrice = () =>
    ((price / 100) * (100 - discount)).toFixed(2);

  const countDiscountAmount = () =>
    ((price - countDiscUnitPrice(price, discount)) * qty).toFixed(2);

  const countOriginalTotal = () => (price * qty).toFixed(2);

  const countDiscountedTotal = (
    ((price * qty) / 100) *
    (100 - discount)
  ).toFixed(2);

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <label>Product Name</label>
        <input
          type="text"
          ref={nameRef}
          onChange={changeNameHandler}
          className={classes.name}
          value={name}
          required
        ></input>

        <label>Quantity</label>
        <input
          type="number"
          ref={qtyRef}
          onChange={changeQtyHandler}
          value={qty}
          step="1"
          max="99"
          required
        ></input>
        <label>Original Unit Price</label>
        <input
          type="number"
          ref={priceRef}
          onChange={changePriceHandler}
          value={price}
          required
        ></input>
        <label>Discount (%)</label>
        <input
          type="number"
          min="0"
          max={100}
          ref={discountRef}
          onChange={changeDiscountHandler}
          value={discount}
          required
        ></input>
        <div></div>
        <div></div>
        <label>Discounted Unit Price: </label>
        <h3>${countDiscUnitPrice()}</h3>
        <label>Total Discount ($): </label>
        <h3>${countDiscountAmount()}</h3>
        <div></div>
        <div></div>
        <label>Total Original Price: </label>
        <h3>${countOriginalTotal()}</h3>
        <label>Total Discounted Price: </label>
        <h2 className={classes["total-price"]}>${countDiscountedTotal}</h2>
      </div>

      <div className={classes.buttons}>
        <div className={classes.btn}>
          <ion-icon name="remove-circle-outline" />
        </div>
        <div className={classes.btn}>
          <ion-icon name="add-circle-outline" />
        </div>
      </div>
    </div>
  );
}

export default SingleProdForm;
