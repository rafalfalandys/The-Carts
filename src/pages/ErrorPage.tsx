import classes from "./ErrorPage.module.scss";
import { Fragment } from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const errorObj: any = useRouteError();

  console.log(errorObj.message);

  let msg = `Something went wrong (${errorObj?.message})`;

  // during development I was testing the app with many people. Sometimes they stored data in local storage, than that data was different, than one expected, and generating errors. I added button clearing storage for these people.
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
      </main>
    </Fragment>
  );
};

export default ErrorPage;
