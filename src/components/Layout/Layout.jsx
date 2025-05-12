// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import Footer from "../Footer/Footer";
import s from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <AppBar />
      <main>
        <h1 className={s.title}>My Phonebook</h1>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
