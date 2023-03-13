import classes from "./ErrorPage.module.scss";
import { Fragment } from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const errorObj = useRouteError();

  console.log(errorObj.message);

  let msg = `Something went wrong (${errorObj?.message})`;

  if (errorObj.status === 500) msg = errorObj.data.message;
  console.log(errorObj);
  return (
    <Fragment>
      <main className={classes.main}>
        <h1>ERROR!</h1>
        <h2>{`${msg} (status code - ${errorObj.status})`}</h2>
        <p>Click on the logo to go back to main page</p>
      </main>
    </Fragment>
  );
}

export default ErrorPage;

// import { useRouteError } from "react-router";

// function ErrorPage() {
//   const errorObj = useRouteError();
//   return <p>{errorObj.data.message}</p>;
// }

// export default ErrorPage;
