import classes from "./ErrorPage.module.scss";
import { Fragment } from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const errorObj: any = useRouteError();

  console.log(errorObj.message);

  let msg = `Something went wrong (${errorObj?.message})`;

  const clearLocalStorageHandler = () => {
    localStorage.clear();
  };

  return (
    <Fragment>
      <main className={classes.main}>
        <h1>ERROR!</h1>
        <h2>{msg}</h2>
        <p>
          Clearing local storage helps sometimes (but you will loose added carts
          data)
        </p>
        <div className={classes.btn} onClick={clearLocalStorageHandler}>
          Clear Local Storage
        </div>
        {/* <p>Click on the logo to go back to main page</p> */}
      </main>
    </Fragment>
  );
};

export default ErrorPage;
