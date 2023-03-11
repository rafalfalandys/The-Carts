import { useParams } from "react-router-dom";
import classes from "./CartDetails.module.scss";

import Chart from "./Chart";
import Products from "./Products";

function CartDetails() {
  const params = useParams();
  console.log(params);
  return (
    <div className={classes.details}>
      <Products />
      <Chart />
    </div>
  );
}

export default CartDetails;

export const loader = async () => {
  fetch();
};
