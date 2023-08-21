import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import {
  INTERNAL_SERVER_ERROR_500,
  BAD_REQUEST_400,
  UNAUTHORIZED_401,
  emailRegex,
} from "../../utils/constants";

function Login({ handleLogin, error, isWaiting }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation();
  const [textError, setTextError] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values.email, values.password);
    resetForm();
  }

  useEffect(() => {
    if (values.email === undefined || values.password === undefined) {
      setIsValid(false);
    }
  }, [, values]);

  useEffect(() => {
    if (error === 400) {
      console.log(error);
      setTextError(BAD_REQUEST_400);
    }
    if (error === 401) {
      console.log(error);
      setTextError(UNAUTHORIZED_401);
    }
    if (error === 500) {
      setTextError(INTERNAL_SERVER_ERROR_500);
    }
  }, [error]);

  return (
    <main className="login">
      <form
        className="login-form"
        name="login"
        onSubmit={handleSubmit}
        noValidate
      >
        <Link to="/">
          <img className="logo login-form__logo" src={logo} alt="Логотип" />
        </Link>
        <p className="login-form__name">Рады видеть!</p>
        <label className="login-form__field">
          E-mail
          <input
            id="email"
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="login-form__info"
            minLength={2}
            maxLength={40}
            required
            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,}"
            // disabled={isWaiting}
          />
          <span
            className={`login-form__info-error ${
              errors.email ? "login-form__info-error_active" : ""
            }`}
          >
            {errors.email}
          </span>
        </label>
        <label className="login-form__field">
          Пароль
          <input
            id="password"
            type="password"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Пароль"
            className="login-form__info"
            minLength={8}
            maxLength={40}
            required
            // disabled={isWaiting}
          />
          <span
            className={`login-form__info-error ${
              errors.password ? "login-form__info-error_active" : ""
            }`}
          >
            {errors.password}
          </span>
        </label>
        <p className="login-form__err">{!!textError.length ? textError : ""}</p>

        <button className="login-form__save" type="submit" disabled={!isValid}>
          Войти
        </button>
        <div className="login__signup">
          <p className="login__signup-text">Еще не зарегистрированы?</p>
          <Link to="/signup" className="login__signup-link">
            Регистрация
          </Link>
        </div>
      </form>
    </main>
  );
}
export default Login;
