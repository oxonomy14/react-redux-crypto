import style from "./Modal.module.css";
import { useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Modal = ({ children, title, handleCloseModal }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseModal();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleCloseModal]);

  return (
    <div className={style.wrapper} onClick={handleBackdropClick}>
      <div className={style.content}>
        <h2>{title}</h2>
        <hr />

        <button className={style.closeBtn} onClick={handleCloseModal}>
          <AiOutlineCloseCircle />
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
