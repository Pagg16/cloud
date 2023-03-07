import React, { useState } from "react";
import "./registration.less";
import Input from "../../utils/input/input";
import { autorization, registration } from "../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function registrationHandler() {
    registration(email, password).then(() => {
      dispatch(autorization(email, password)).then(() => {
        navigate("/", { replace: true });
      });
    });
  }

  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
      <Input
        setValue={setEmail}
        value={email}
        type="text"
        placeholder="Введите email"
      />
      <Input
        setValue={setPassword}
        value={password}
        type="password"
        placeholder="Введите пароль"
      />

      <button onClick={registrationHandler} className="registration__btn">
        Регистрация
      </button>
    </div>
  );
};

export default Registration;
