import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import { toast } from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
};

const ContactFormShema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .min(13, "Too short!")
    .max(25, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(7, "Too short!")
    .max(16, "Too Long!")
    .required("Required"),
});

export const LoginForm = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        console.log("login success");
        toast.success("You have passed authorization");
      })
      .catch(() => {
        console.log("login error");
        toast.error("You provided incorrect data. Authorization failed!");
      });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormShema}
    >
      <Form className={css.form}>
        <div className={css.inputField}>
          <label htmlFor={emailFieldId} className={css.label}>
            E-mail
          </label>
          <Field
            className={css.field}
            type="email"
            name="email"
            id={emailFieldId}
            placeholder="myemail@google.com"
          />
        </div>
        <ErrorMessage name="email" component="div" className={css.error} />
        <div className={css.inputField}>
          <label htmlFor={passwordFieldId} className={css.label}>
            Password
          </label>
          <Field
            className={css.field}
            type="password"
            name="password"
            id={passwordFieldId}
          />
        </div>
        <ErrorMessage name="password" component="div" className={css.error} />
        <div className={css.btnbox}>
          <button type="submit" className={css.btn}>
            Sing In
          </button>
        </div>
      </Form>
    </Formik>
  );
};
