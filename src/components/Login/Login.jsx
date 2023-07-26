import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login() {
  return (
    <main className="login">
      <form className="login-form">
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
            placeholder="Email"
            className="login-form__info"
            minLength="2"
            maxLength="40"
            required=""
          />
          </label>
          <label className="login-form__field">
            Пароль
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Пароль"
            className="login-form__info"
            minLength="6"
            maxLength="40"
            required=""
          />
           </label>
            
        {/* <p className="login-form__err">Что-то пошло не так...</p> */}
        <button className="login-form__save" type="submit">
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
