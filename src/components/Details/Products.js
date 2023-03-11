import classes from "./Products.module.scss";

function Products() {
  return (
    <div className={classes.products}>
      <h2>
        Click on one of the carts to display its details, or start adding new
        cart to display the new cart form
      </h2>
    </div>
  );
}

export default Products;
