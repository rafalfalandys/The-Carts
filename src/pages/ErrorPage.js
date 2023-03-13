import classes from "./ErrorPage.module.scss";
import { Fragment } from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const errorObj = useRouteError();

  console.log(errorObj.message);

  let msg = `Something went wrong (${errorObj?.message})`;

  return (
    <Fragment>
      <main className={classes.main}>
        <h1>ERROR!</h1>
        <h2>{msg}</h2>
        {/* <p>Click on the logo to go back to main page</p> */}
      </main>
    </Fragment>
  );
}

export default ErrorPage;
