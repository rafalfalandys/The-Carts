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

  // functions calculating rest values
  const countDiscUnitPrice = () =>
    ((price / 100) * (100 - discount)).toFixed(2);

  const countDiscountAmount = () =>
    ((price - +countDiscUnitPrice()) * qty).toFixed(2);

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
          value={name}
          maxLength={30}
          required
        ></input>

        <label>Quantity</label>
        <input
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
        <label>Original Unit Price</label>
        <input
          name="price"
          type="number"
          ref={priceRef}
          onChange={changePriceHandler}
          value={price}
          max="5000"
          required
        ></input>
        <label>Discount (%)</label>
        <input
          name="discount-percentage"
          type="number"
          min="0"
          ref={discountRef}
          onChange={changeDiscountHandler}
          value={discount}
          max="100"
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
        {/* <ion-icon name="remove-circle-outline" onClick={onRemoveBtnHandler} /> */}
        <MinusCircleIcon onClick={onRemoveBtnHandler} />
      </div>
    </div>
  );
};

export default SingleProdForm;
