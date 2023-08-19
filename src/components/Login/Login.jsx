import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Login({ handleLogin, error, isWaiting }) {
  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation();
  const [textError, setTextError] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = values;
    if (isValid) {
      handleLogin(email, password);
      resetForm();
    }
  }

  useEffect(() => {
    if ((values.email === undefined || values.password === undefined)) {
        setIsValid(false)
    }
}, [ , values]);

  useEffect(() => {
    if (error === 400) {
      console.log(error);
      setTextError(
        "При авторизации произошла ошибка. Переданный токен некорректен"
      );
    }
    if (error === 401) {
      console.log(error);
      setTextError("Вы ввели не верный логин или пароль");
    }
    if (error === 500) {
      setTextError("На сервере произошла ошибка.");
    }
  }, [error]);

  return (
    <main className="login">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
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
            minLength={6}
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
      
        <button
          className={`login-form__save ${
            !isValid ? "login-form__save_disabled" : ""
          }`}
          type="submit"
          disabled={!isValid}
        >
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
