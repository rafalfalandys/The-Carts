import classes from "./Table.module.scss";

function Table(props) {
  const productsList = props.cart.products.map((prod, i) => {
    const promoPrice = Math.round(
      (prod.price / 100) * (100 - prod.discountPercentage)
    );
    const discount = (prod.price - promoPrice) * prod.quantity;

    return (
      <tr key={prod.id}>
        <td className={classes.no}>{i + 1}</td>
        <td className={classes.name}>{prod.title}</td>
        <td>{prod.quantity}</td>
        <td>${prod.price}</td>
        <td>{Math.round(prod.discountPercentage)}%</td>
        <td>${promoPrice}</td>
        <td>${prod.total}</td>
        <td>${discount}</td>
        <td>${prod.discountedPrice}</td>
      </tr>
    );
  });

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
          <th className={classes.column}>Disc. Unit Price</th>
          <th className={classes.column}>Total</th>
          <th className={classes.column}>Total Discount</th>
          <th className={classes.column}>Final Price</th>
        </tr>
      </thead>
      <tbody>
        {productsList}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>${props.cart.total}</td>
          <td>-${props.cart.total - props.cart.discountedTotal}</td>
          <td className={classes.total}>${props.cart.discountedTotal}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
