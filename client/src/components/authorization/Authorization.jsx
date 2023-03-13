import React, { useState } from "react";
import "./authorization.less";
import Input from "../../utils/input/input";
import { autorization } from "../../actions/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Authorization = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispath = useDispatch();
  const navigate = useNavigate();

  async function autorizationHandler() {
    await dispath(autorization(email, password));
    navigate("/", { replace: true });
  }

  return (
    <div className="authorization">
      <div className="authorization__container">
        <div className="authorization__header">Авторизация</div>
        <Input
          setValue={setEmail}
          value={email}
          type="email"
          placeholder="Введите email"
        />
        <Input
          setValue={setPassword}
          value={password}
          type="password"
          placeholder="Введите пароль"
        />

        <button
          onClick={() => autorizationHandler()}
          className="authorization__btn"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default Authorization;
