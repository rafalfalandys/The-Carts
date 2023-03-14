import { Link } from "react-router-dom";
import classes from "./NewCartBtn.module.scss";

function NewCartBtn() {
  return (
    <li className={classes.cart}>
      <Link to="new-cart">
        <div className={classes.icon}>
          <ion-icon name="add-circle-outline" />
        </div>
      </Link>
    </li>
  );
}

export default NewCartBtn;
