import { Link } from "react-router-dom";
import classes from "./NewCartBtn.module.scss";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

function NewCartBtn() {
  return (
    <li className={classes.cart}>
      <Link to="new-cart">
        <div className={classes.icon}>
          {/* <ion-icon name="add-circle-outline" /> */}
          <PlusCircleIcon />
        </div>
      </Link>
    </li>
  );
}

export default NewCartBtn;
