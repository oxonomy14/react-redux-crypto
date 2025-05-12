import css from "./Contact.module.css";
import { GrUserManager } from "react-icons/gr";
import { MdOutlineContactPhone } from "react-icons/md";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import { deleteContact } from "../../redux/contacts/operations";
import {
  selectSuccess,
  selectIsEdit,
  selectIsDelete,
} from "../../redux/contacts/selectors";
import {
  setIsEdit,
  setIsDelete,
  setCurrentContact,
  resetSuccess,
} from "../../redux/contacts/slice";
import DeleteForm from "../DeleteForm/DeleteForm";
import EditForm from "../EditForm/EditForm";

const Contact = ({ item }) => {
  const dispatch = useDispatch();
  const success = useSelector(selectSuccess);
  const isDelete = useSelector(selectIsDelete);
  const isOpenEditForm = useSelector(selectIsEdit);

  const handleEditForm = () => {
    dispatch(setIsEdit(true));
    dispatch(setCurrentContact(item));
  };

  const handleDeleteForm = () => {
    dispatch(setIsDelete(true));
    dispatch(setCurrentContact(item));
  };

  const onDelete = () => {
    dispatch(deleteContact(item.id));
    if (success) toast.success("Contact already success delete");
    dispatch(resetSuccess(false));
    dispatch(setIsDelete(false));
  };

  return (
    <>
      <li className={css.contactItem}>
        <div>
          <h3 className={css.titleContactItem}>
            <GrUserManager size={28} className={css.icon} />
            {item.name}
          </h3>

          <p className={css.phoneContactItem}>
            <MdOutlineContactPhone size={28} className={css.icon} />
            {item.number}
          </p>
        </div>
        <div className={css.buttonBox}>
          <button
            type="button"
            className={css.buttonContactItem}
            onClick={handleDeleteForm}
          >
            Delete
          </button>
          <button
            type="button"
            className={css.buttonContactItem}
            onClick={handleEditForm}
          >
            Edit
          </button>
          {isDelete && <DeleteForm onDelete={onDelete} />}
          {isOpenEditForm && <EditForm />}
        </div>
      </li>
    </>
  );
};

export default Contact;
