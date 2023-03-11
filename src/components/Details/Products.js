import classes from "./Products.module.scss";

function Products(props) {
  console.log(props);
  return (
    <div className={classes.products}>
      <h2>
        {!props.cart && (
          <p>
            Click on one of the carts to display its details, or start adding
            new cart to display the new cart form
          </p>
        )}
        {props.cart && (
          <ul>
            {props.cart.products.map((prod) => (
              <li>{prod.title}</li>
            ))}
          </ul>
        )}
      </h2>
    </div>
  );
}

export default Products;
