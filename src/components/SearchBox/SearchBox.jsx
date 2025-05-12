import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";

import { changeFilter } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectNameFilter);
  const handleChangeQuery = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <>
      <p className={css.txt}>Find contacts by name or number</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={handleChangeQuery}
        placeholder="Put your search name contact"
      />
    </>
  );
};

export default SearchBox;
