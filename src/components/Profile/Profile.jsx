import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header"

function Profile() {
  return (
    <main className="profile">
        <Header/>
      <form className="profile-form">
        <p className="profile-form__name">Привет, Вероника!</p>
          <label className="profile-form__field">
            <input
              id="name"
              type="name"
              name="name"
              value=""
              placeholder="Имя"
              className="profile-form__info"
              minLength="2"
              maxLength="40"
              required=""
            />
            Вероника
          </label>
          <hr className="profile-form__line"></hr>
          <label className="profile-form__field">
          <input
            id="email"
            type="email"
            name="email"
            value=""
            placeholder="Email"
            className="profile-form__info"
            minLength="2"
            maxLength="40"
            required=""
          />
          pochta@yandex.ru
          </label>
            
        <button className="profile-form__save" type="submit">
          Редактировать
        </button>
          <Link to="/signin" className="profile__signin-link">
            Выйти из аккаунта
          </Link>
        </form>
    </main>
  );
}
export default Profile;
