import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { useEffect } from "react";
import * as Yup from "yup";

import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { resetSuccess } from "../../redux/contacts/slice.js";
import { addContact } from "../../redux/contacts/operations";
import {
  selectContacts,
  selectSuccess,
} from "../../redux/contacts/selectors.js";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

const initialValues = {
  name: "",
  number: "",
};

const ContactFormShema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too Long!")
    .required("fill in the field"),
  number: Yup.string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{2,3}[-.\s]?\d{2,4}$/,
      "Invalid phone number format"
    )
    .required("fill in the field"),
});

const ContactForm = () => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const contacts = useSelector(selectContacts);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch();

  const handleAddContact = (values, actions) => {
    if (compareName(values.name)) {
      toast.error("This name is already in the database");
      return;
    }

    if (compareNumber(values.number)) {
      toast.error("This phone is already in the database");
      return;
    }

    const newContact = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    if (success) {
      toast.success("Contact has been added successfully!");
      dispatch(resetSuccess(false)); // скидаємо прапорець після показу
    }
    actions.resetForm();
  };

  //  Функція перевірки унікальності todo

  const compareName = (name) => {
    return contacts.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
  };

  const compareNumber = (number) => {
    return contacts.some((item) => item.number === number);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddContact}
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
              placeholder="Andrii Semenenko"
            />
          </div>
          <ErrorMessage name="name" component="div" className={css.error} />

          <div className={css.inputField}>
            <label htmlFor={numberFieldId} className={css.label}>
              Number
            </label>
            <Field
              className={css.field}
              type="text"
              name="number"
              id={numberFieldId}
              placeholder="372-05-18"
            />
          </div>
          <ErrorMessage name="number" component="div" className={css.error} />
          <div className={css.btnbox}>
            <Button variant="outlined" type="submit">
              ADD CONTACT
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
