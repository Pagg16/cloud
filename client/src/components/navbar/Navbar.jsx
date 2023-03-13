import React, { useEffect, useRef, useState } from "react";
import "./navbar.less";
import "../../utils/theme.less";
import Logo from "../../assets/img/navbar-logo.png";
import searchIcon from "../../assets/img/search-icon.png";
import settingsDarck from "../../assets/img/settings-darck.png";
import settingsWhite from "../../assets/img/settings-white.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduser/userReduser";
import { getFiles, searchFile } from "../../actions/file";
import {
  hideLoader,
  hideSetPopup,
  showLoader,
  showSetPopup,
} from "../../reduser/appReduser";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const theme = useSelector((state) => state.app.theme);
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

  const SearchComponent = (
    <div className="navbar__search-container">
      <img src={searchIcon} alt="search-icon" className="navbar__search-icon" />

      <input
        value={serchName}
        onChange={(e) => serchChangeHandler(e)}
        className={`navbar__search ${
          theme === "dark" ? "border-bottom theme-placeholder" : ""
        }`}
        type="text"
        placeholder="Название файла"
      />
    </div>
  );

  const exitButton = (
    <div
      onClick={() => {
        dispatch(hideSetPopup());
        dispatch(logout());
      }}
      className={`navbar__exit ${theme === "dark" ? "theme-text" : ""}`}
    >
      Выход
    </div>
  );

  useEffect(() => {
    window.exitButtonComponent = exitButton;
  }, []);

  return (
    <div
      className={`navbar  ${theme === "dark" ? "theme-background-header" : ""}`}
    >
      <div className="navbar__container">
        <div className="navbar__logo-container">
          <img src={Logo} alt="logo" className="navbar__logo" />
          <div
            className={`navbar__header ${
              theme === "dark" ? "theme-text-logo" : ""
            }`}
          >
            CLOUD
          </div>
        </div>

        {isAuth && SearchComponent}

        <div className="navbar__btns-container">
          {!isAuth && (
            <>
              <div
                className={`navbar__login ${
                  theme === "dark" ? "theme-text" : ""
                }`}
              >
                <NavLink
                  className={`${theme === "dark" ? "theme-text" : ""}`}
                  to="/autorization"
                >
                  Войти
                </NavLink>
              </div>

              <div className="navbar__registration">
                <NavLink
                  className={`${theme === "dark" ? "theme-text" : ""}`}
                  to="/registration"
                >
                  Регистрация
                </NavLink>
              </div>
            </>
          )}
          {isAuth && <div className="disk__invisible"> {exitButton} </div>}
        </div>
        {isAuth && (
          <div className="disk__visible">
            <button
              onClick={() => dispatch(showSetPopup())}
              className="navbar__setting-bts"
            >
              <img
                src={theme === "dark" ? settingsWhite : settingsDarck}
                className="navbar__setting-bts-icon"
                alt="setting-icon"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
