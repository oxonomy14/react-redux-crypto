import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "../redux/auth/operations";
import { selectIsRefreshing } from "../redux/auth/selectors";

import AppBar from "./AppBar/AppBar";
import Layout from "./Layout/Layout";
//import HomePage from "../pages/HomePage/HomePage";
//import RegisterPage from "../pages/RegisterPage/RegisterPage";
//import LoginPage from "../pages/LoginPage/LoginPage";
//import ContactsPage from "../pages/ContactsPage/ContactsPage";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../pages/ContactsPage/ContactsPage"));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing page...</strong>
  ) : (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <RestrictedRoute
                  component={<HomePage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="contacts"
              element={
                <PrivateRoute
                  component={<ContactsPage />}
                  redirectTo="/login"
                />
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
