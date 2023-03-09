import React, { useState } from "react";
import "./navbar.less";
import Logo from "../../assets/img/navbar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduser/userReduser";
import { getFiles, searchFile } from "../../actions/file";
import { hideLoader, showLoader } from "../../reduser/appReduser";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();
  const [serchName, setSerchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);

  function serchChangeHandler(e) {
    setSerchName(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
      setSearchTimeout(false);
    }

    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFile(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
    dispatch(hideLoader());
  }

  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">CLOUD</div>

        {isAuth && (
          <input
            value={serchName}
            onChange={(e) => serchChangeHandler(e)}
            className="navbar__search"
            type="text"
            placeholder="Название файла"
          />
        )}
        {!isAuth && (
          <>
            <div className="navbar__login">
              <NavLink to="/autorization">Войти</NavLink>
            </div>

            <div className="navbar__registration">
              <NavLink to="/registration">Регистрация</NavLink>
            </div>
          </>
        )}
        {isAuth && (
          <div onClick={() => dispatch(logout())} className="navbar__exit">
            Выход
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
