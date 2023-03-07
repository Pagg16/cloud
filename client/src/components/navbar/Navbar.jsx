import React from "react";
import "./navbar.less";
import Logo from "../../assets/img/navbar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reduser/userReduser";

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="container">
        <img src={Logo} alt="" className="navbar__logo" />
        <div className="navbar__header">CLOUD</div>

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
