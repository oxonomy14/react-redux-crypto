import s from "./DeleteForm.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectCurrentContact } from "../../redux/contacts/selectors";
import { useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { setIsDelete, setCurrentContact } from "../../redux/contacts/slice";

const DeleteForm = ({ onDelete }) => {
  const currentContact = useSelector(selectCurrentContact);
  const dispatch = useDispatch();

  const cancelDelete = () => {
    dispatch(setIsDelete(false));
    dispatch(setCurrentContact(null));
  };

  return (
    <Modal
      title={`Delete ${currentContact?.name}?`}
      handleCloseModal={cancelDelete}
    >
      <div>
        <div className={s.boxTitle}>
          <h3>You want delete this contact. Are you sure?</h3>
        </div>
        <div className={s.buttonBox}>
          <button onClick={cancelDelete}>Not now</button>
          <button onClick={onDelete}>YES</button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteForm;
