import style from "./EditForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { editContact } from "../../redux/contacts/operations";
import { selectCurrentContact } from "../../redux/contacts/selectors";
import { setIsEdit, setCurrentContact } from "../../redux/contacts/slice";
import Modal from "../Modal/Modal";

const EditForm = () => {
  const dispatch = useDispatch();
  const currentContact = useSelector(selectCurrentContact);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const number = e.target.elements.number.value.trim();
    if (!name || !number) return;

    updateContact(name, number);
    e.target.reset();
  };

  const updateContact = (name, number) => {
    const body = { name, number };
    dispatch(editContact({ id: currentContact.id, body }));
    dispatch(setIsEdit(false));
    dispatch(setCurrentContact(null));
  };

  const cancelUpdate = () => {
    dispatch(setIsEdit(false));
    dispatch(setCurrentContact(null));
  };

  return (
    <Modal
      title={`Edit ${currentContact?.name}?`}
      handleCloseModal={cancelUpdate}
    >
      <div>
        <form className={style.form} onSubmit={handleSubmit}>
          <div>
            <input
              className={style.input}
              name="name"
              required
              defaultValue={currentContact?.name || ""}
            />
            <input
              className={style.input}
              name="number"
              required
              defaultValue={currentContact?.number || ""}
            />
          </div>
          <div className={style.buttonBox}>
            <button className={style.buttonForm} type="submit">
              Save
            </button>

            <button
              className={style.buttonForm}
              type="button"
              onClick={cancelUpdate}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditForm;
