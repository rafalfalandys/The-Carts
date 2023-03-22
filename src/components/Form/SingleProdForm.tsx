import { useRef, useState } from "react";
import classes from "./SingleProdForm.module.scss";

import { MinusCircleIcon } from "@heroicons/react/24/outline";

const SingleProdForm: React.FC<{
  id: number;
  removeProdHandler: (prodId: number) => void;
}> = (props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const discountRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("Some product");
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(19);
  const [discount, setDiscount] = useState(10);

  // change input handlers
  const changeNameHandler = () => {
    if (nameRef.current) setName(nameRef.current.value);
  };
  const changeQtyHandler = () => {
    if (qtyRef.current) setQty(+qtyRef.current.value);
  };
  const changePriceHandler = () => {
    if (priceRef.current) setPrice(+priceRef.current.value);
  };
  const changeDiscountHandler = () => {
    if (discountRef.current) setDiscount(+discountRef.current.value);
  };

  // calculations
  const countDiscUnitPrice = () =>
    ((price / 100) * (100 - discount)).toFixed(2);

  const countDiscountAmount = () =>
    ((price - +countDiscUnitPrice()) * qty).toFixed(2);

  const countOriginalTotal = () => (price * qty).toFixed(2);

  const countDiscountedTotal = (
    ((price * qty) / 100) *
    (100 - discount)
  ).toFixed(2);

  const onRemoveProductHandler = () => props.removeProdHandler(props.id);

  return (
    <div className={classes.wrapper}>
      <div className={classes.form}>
        <label htmlFor="title">Product Name</label>
        <input
          id="title"
          name="title"
          type="text"
          ref={nameRef}
          onChange={changeNameHandler}
          className={classes.name}
          value={name}
          maxLength={30}
          required
        ></input>

        <label htmlFor="qty">Quantity</label>
        <input
          id="qty"
          name="qty"
          type="number"
          ref={qtyRef}
          onChange={changeQtyHandler}
          value={qty}
          step="1"
          min={1}
          max={20}
          required
        ></input>
        <label htmlFor="price">Original Unit Price</label>
        <input
          id="price"
          name="price"
          type="number"
          ref={priceRef}
          onChange={changePriceHandler}
          value={price}
          min={0}
          max={5000}
          required
        ></input>
        <label htmlFor="discount-perc">Discount (%)</label>
        <input
          id="discount-perc"
          name="discount-percentage"
          type="number"
          ref={discountRef}
          onChange={changeDiscountHandler}
          value={discount}
          min={0}
          max={100}
          required
        ></input>
        <div></div>
        <div></div>
        <label htmlFor="discount-price">Discounted Unit Price ($) </label>
        <input
          id="discount-price"
          className={classes.readonly}
          name="discount-price"
          readOnly
          value={`${countDiscUnitPrice()}`}
        ></input>
        <label htmlFor="disc-dollars">Total Discount ($)</label>
        <input
          id="disc-dollars"
          readOnly
          value={`${countDiscountAmount()}`}
          className={classes.readonly}
        ></input>
        <div></div>
        <div></div>
        <label htmlFor="total">Total Original Price ($)</label>
        <input
          id="total"
          name="total"
          readOnly
          value={`${countOriginalTotal()}`}
          className={classes.readonly}
        ></input>
        <label htmlFor="disc-total">Total Discounted Price ($)</label>
        <input
          id="disc-total"
          type="text"
          className={`${classes.readonly} ${classes["total-price"]}`}
          readOnly
          value={`${countDiscountedTotal}`}
        ></input>
      </div>

      <div className={classes.btn}>
        <MinusCircleIcon onClick={onRemoveProductHandler} />
      </div>
    </div>
  );
};

export default SingleProdForm;
