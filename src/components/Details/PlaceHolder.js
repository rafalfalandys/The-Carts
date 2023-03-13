import classes from "./PlaceHolder.module.scss";

function PlaceHolder() {
  return (
    <h2 className={classes.placeholder}>
      <p>
        Click on one of the carts to display its details and price chart, or
        start adding new cart to display the new cart form.
      </p>
    </h2>
  );
}

export default PlaceHolder;
