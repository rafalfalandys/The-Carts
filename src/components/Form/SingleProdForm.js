import { useRef, useState } from "react";
import classes from "./SingleProdForm.module.scss";

function SingleProdForm(props) {
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

  const onRemoveBtnHandler = () => props.removeProdHandler(props.id);

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <label>Product Name</label>
        <input
          name="title"
          type="text"
          ref={nameRef}
          onChange={changeNameHandler}
          className={classes.name}
          //   value={name}
          defaultValue="test name"
          required
        ></input>

        <label>Quantity</label>
        <input
          name="qty"
          type="number"
          ref={qtyRef}
          onChange={changeQtyHandler}
          //   value={qty}
          defaultValue="2"
          step="1"
          max="99"
          required
        ></input>
        <label>Original Unit Price</label>
        <input
          name="price"
          type="number"
          ref={priceRef}
          onChange={changePriceHandler}
          //   value={price}
          defaultValue="12"
          required
        ></input>
        <label>Discount (%)</label>
        <input
          name="discount-percentage"
          type="number"
          min="0"
          max={100}
          ref={discountRef}
          onChange={changeDiscountHandler}
          //   value={discount}
          defaultValue="10"
          required
        ></input>
        <div></div>
        <div></div>
        <label>Discounted Unit Price ($) </label>
        <input
          className={classes.readonly}
          name="discount-price"
          readOnly
          value={`${countDiscUnitPrice()}`}
        ></input>
        <label>Total Discount ($): </label>
        <input
          readOnly
          value={`${countDiscountAmount()}`}
          className={classes.readonly}
        ></input>
        <div></div>
        <div></div>
        <label>Total Original Price ($) </label>
        <input
          name="total"
          readOnly
          value={`${countOriginalTotal()}`}
          className={classes.readonly}
        ></input>
        <label>Total Discounted Price: </label>
        <input
          className={`${classes.readonly} ${classes["total-price"]}`}
          readOnly
          value={`$${countDiscountedTotal}`}
        ></input>
      </div>

      <div className={classes.btn}>
        <ion-icon name="remove-circle-outline" onClick={onRemoveBtnHandler} />
      </div>
    </div>
  );
}

export default SingleProdForm;
