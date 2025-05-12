import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";

export const AuthNav = () => {
  const activeLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div>
      <NavLink className={activeLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={activeLinkClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
