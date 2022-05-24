import React, { useState, useEffect } from "react";

import "./layout.css";

import Sidebar from "../sidebar/Sidebar";
import TopNav from "../topnav/TopNav";
import Login from "../login/Login";
import Routes from "../Routes";

import { BrowserRouter, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ThemeAction from "../../redux/actions/ThemeAction";
import axios from "axios";

const Layout = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);

  const [loggedIn, setLoggedIn] = useState(false);

  const [tapLogin, setTapLogin] = useState(false);

  const passData = (data) => {
    setTapLogin(data)
  };

  const lookForLogin = async () => {
    const users = await axios.get('/getUsers');
    users.data.forEach((user) => {
      if (user.current === true)
      {
        setLoggedIn(true)
      }
    })
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));

    lookForLogin()
  }, [dispatch, tapLogin]);

  return (
    <>
      {loggedIn ? (
        <BrowserRouter>
          <Route
            render={(props) => (
              <div
                className={`layout ${themeReducer.mode} ${themeReducer.color}`}
              >
                <Sidebar {...props} />
                <div className="layout__content">
                  <TopNav />
                  <div className="layout__content-main">
                    <Routes />
                  </div>
                </div>
              </div>
            )}
          />
        </BrowserRouter>
      ) : (
        <Login passData = {passData}/>
      )}
    </>
  );
};

export default Layout;
