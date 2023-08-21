import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import {
  INTERNAL_SERVER_ERROR_500,
  BAD_REQUEST_400,
  CONFLICT_409,
  emailRegex,
} from "../../utils/constants";

function Register({ handleRegister, error, isWaiting }) {
  //одной строчкой запускается вся валидация:

  const { values, handleChange, errors, isValid, resetForm, setIsValid } =
    useFormAndValidation();
  const [textError, setTextError] = React.useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
      handleRegister(values.name, values.email, values.password );
      resetForm();
  }
  useEffect(() => {
    if ((values.name === undefined || values.email === undefined || values.password === undefined)) {
        setIsValid(false)
    }
}, [ , values]);

  useEffect(() => {
    if (error === 409) {
      setTextError(CONFLICT_409);
    }
    if (error === 400) {
      setTextError(BAD_REQUEST_400);
    }
    if (error === 500) {
      setTextError(INTERNAL_SERVER_ERROR_500);
    } 
  }, [error]);

  return (
    <main className="register">
      <form className="register-form" name="register" onSubmit={handleSubmit} noValidate>
        <Link to="/">
          <img className="logo register-form__logo" src={logo} alt="Логотип" />
        </Link>
        <p className="register-form__name">Добро пожаловать!</p>
        <label className="register-form__field">
          Имя
          <input
            id="name"
            type="text"
            name="name"
            value={values.name || ""}
            onChange={handleChange}
            placeholder="Имя"
            className="register-form__info"
            minLength={2}
            maxLength={40}
            required
            // disabled={isWaiting}
          />
          <span
            className={`register-form__info-error ${
              errors.name ? "register-form__info-error_active" : ""
            }`}
          >
            {errors.name}
          </span>
        </label>
        <label className="register-form__field">
          E-mail
          <input
            id="email"
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="register-form__info"
            minLength={2}
            maxLength={40}
            required
            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,}"
            // disabled={isWaiting}
          />
          <span
            className={`register-form__info-error ${
              errors.email ? "register-form__info-error_active" : ""
            }`}
          >
            {errors.email}
          </span>
        </label>
        <label className="register-form__field">
          Пароль
          <input
            id="password"
            type="password"
            name="password"
            value={values.password || ""}
            onChange={handleChange}
            placeholder="Пароль"
            className="register-form__info"
            minLength={8}
            maxLength={40}
            required
            // disabled={isWaiting}
          />
          <span
            className={`register-form__info-error ${
              errors.password ? "register-form__info-error_active" : ""
            }`}
          >
            {errors.password}
          </span>
        </label>

        <p className="login-form__err">{!!textError.length ? textError : ""}</p>
        <button
          className="register-form__save"
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__signin-link">
            Войти
          </Link>
        </div>
      </form>
    </main>
  );
}
export default Register;
