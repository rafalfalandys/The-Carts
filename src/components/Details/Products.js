import classes from "./Products.module.scss";

function Products(props) {
  console.log(props);
  const productsList = props.cart.products.map((prod) => (
    <tr key={prod.id}>
      <td>{prod.title}</td>
      <td>{prod.quantity}</td>
      <td>${prod.price}</td>
      <td>${prod.total}</td>
      <td>{prod.discountPercentage}%</td>
      <td>${prod.discountedPrice}</td>
    </tr>
  ));
  return (
    <div className={classes.products}>
      <h2 className={classes.placeholder}>
        {!props.cart && (
          <p>
            Click on one of the carts to display its details, or start adding
            new cart to display the new cart form
          </p>
        )}
      </h2>
      {props.cart && (
        <table>
          <thead>
            <tr>
              <th className={classes.one}>Product</th>
              <th className={classes.two}>Qty</th>
              <th className={classes.three}>Price</th>
              <th className={classes.four}>Total</th>
              <th className={classes.five}>Discount</th>
              <th className={classes.six}>Final</th>
            </tr>
          </thead>
          <tbody>
            {productsList}
            <tr>
              <td></td>
              <td></td>
              <td>Total</td>
              <td>${props.cart.total}</td>
              <td>-${props.cart.total - props.cart.discountedTotal}</td>
              <td className={classes.total}>${props.cart.discountedTotal}</td>
            </tr>
          </tbody>
        </table>
        // <ul>
        //   {props.cart.products.map((prod) => (
        //     <li key={prod.id}>{prod.title}</li>
        //   ))}
        // </ul>
      )}
    </div>
  );
}

export default Products;
