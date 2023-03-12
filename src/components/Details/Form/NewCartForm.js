import { Form } from "react-router-dom";
import classes from "./NewCartForm.module.scss";
import SingleProdForm from "./SingleProdForm";

function NewCartForm() {
  return (
    <Form className={classes.form}>
      <SingleProdForm />
    </Form>
  );
}

export default NewCartForm;
