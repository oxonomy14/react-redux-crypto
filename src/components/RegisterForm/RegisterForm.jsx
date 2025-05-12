import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegisterForm.module.css";
import { toast } from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const ContactFormShema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too Long!")
    .required("Required"),
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

export const RegisterForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        console.log("login success");
        toast.success("Registration was successful");
      })
      .catch(() => {
        console.log("login error");
        toast.error(
          "Something went wrong, perhaps an email like this is already in the database"
        );
      });
    console.log(values);

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
          <label className={css.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
            placeholder="Full Name"
          />
        </div>
        <ErrorMessage name="name" component="div" className={css.error} />

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
            Sing Up
          </button>
        </div>
      </Form>
    </Formik>
  );
};
