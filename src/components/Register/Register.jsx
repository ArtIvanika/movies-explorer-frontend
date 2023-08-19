import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Register({ handleRegister, error, isWaiting }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  const [textError, setTextError] = React.useState("");
  const [activeButton, setActiveButton] = React.useState(false);

  useEffect(() => {
    if ((values.name !== undefined || values.email !== undefined || values.password !== undefined)) {
        setActiveButton(true)
        console.log(values.name)
    } else {
        setActiveButton(false)
        console.log(values.name)
    }
}, [ , values]);

  useEffect(() => {
    if (error === 409) {
      setTextError("Пользователь с таким email уже существует");
    }
    if (error === 400) {
      setTextError("При регистрации пользователя произошла ошибка");
    }
    if (error === 500) {
      setTextError("На сервере произошла ошибка.");
    } 
  }, [error]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const { name, email, password } = values;
    if (isValid) {
      handleRegister(name, email, password);
      resetForm();
    }
  }

  return (
    <main className="register">
      <form className="register-form" onSubmit={handleSubmit} noValidate>
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
            minLength={6}
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
          className={`register-form__save 
          ${!isValid ? "register-form__save_disabled" : ""}
          `}
          type="submit"
          disabled={!activeButton || !isValid}
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
