import { Cart } from "../../types";
import classes from "./Table.module.scss";

const Table: React.FC<{ cart: Cart }> = (props) => {
  const productsList = props.cart.products.map((prod, i) => {
    const qty = prod.quantity;
    const originalPrice = prod.price.toFixed(2);
    const discountPercentage = prod.discountPercentage.toFixed(0);
    const discUnitPrice = (
      (prod.price / 100) *
      (100 - prod.discountPercentage)
    ).toFixed(2);
    const total = prod.total.toFixed(2);
    const totalDiscount = (
      (prod.price - +discUnitPrice) *
      prod.quantity
    ).toFixed(2);
    const finalPrice = prod.discountedPrice.toFixed(2);

    return (
      <tr key={prod.id}>
        <td className={classes.no}>{i + 1}</td>
        <td className={classes.name}>{prod.title}</td>
        <td>{qty}</td>
        <td>${originalPrice}</td>
        <td>{discountPercentage}%</td>
        <td className={classes.hidden}>${discUnitPrice}</td>
        <td>${total}</td>
        <td className={classes.hidden}>${totalDiscount}</td>
        <td>${finalPrice}</td>
      </tr>
    );
  });

  const discountedTotal = props.cart.discountedTotal.toFixed(2);

  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={classes.no}>
            <span>No.</span>
          </th>
          <th className={classes.name}>
            <span>Product</span>
          </th>
          <th className={classes.column}>Qty</th>
          <th className={classes.column}>Original Price</th>
          <th className={classes.column}>Disc.</th>
          <th className={`${classes.column} ${classes.hidden}`}>
            Disc. Unit Price
          </th>
          <th className={classes.column}>Total</th>
          <th className={`${classes.column} ${classes.hidden}`}>
            Total Discount
          </th>
          <th className={classes.column}>Final Price</th>
        </tr>
      </thead>
      <tbody>
        {productsList}
        <tr>
          <td className={classes.hidden}></td>
          <td className={classes.hidden}></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>${props.cart.total.toFixed(2)}</td>
          <td>
            -${(props.cart.total - props.cart.discountedTotal).toFixed(2)}
          </td>
          <td className={classes.total}>{`$${discountedTotal}`}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
