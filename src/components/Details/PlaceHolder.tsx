import classes from "./PlaceHolder.module.scss";

function PlaceHolder() {
  return (
    <div className={classes.placeholder}>
      <h2>
        Click on one of the carts to display its details and price chart, or
        start adding a new cart to display the new cart form.
      </h2>
    </div>
  );
}

export default PlaceHolder;
