import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Profile({ signOut, isLoading, onUpdateUser, error }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const [textError, setTextError] = useState("");

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    handleChange(e);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    handleChange(e);
  }

  useEffect(() => {
    if (
      values.name !== currentUser.name ||
      values.email !== currentUser.email
    ) {
      setActiveButton(true);
    } else {
      setActiveButton(false);
    }
  }, [currentUser, values, isEditing]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateUser({ name, email });
    }
  }

  useEffect(() => {
    if (error === 400) {
      setTextError("При обновлении профиля произошла ошибка");
    }
    if (error === 409) {
      setTextError("Пользователь с таким email уже существует.");
    }
    if (error === 500) {
      setTextError("На сервере произошла ошибка.");
    }
  }, [error]);

  return (
    <main className="profile">
      <form className="profile-form" onSubmit={handleSubmit}>
        <p className="profile-form__name">Привет, {currentUser.name}!</p>
        <label className="profile-form__field">
          Имя
          <input
            id="name"
            type="text"
            name="name"
            value={name || ""}
            onChange={handleNameChange}
            placeholder="Виталий"
            className="profile-form__info"
            minLength={2}
            maxLength={40}
            required
            disabled={!isEditing}
          />
        </label>
        <hr className="profile-form__line"></hr>
        <label className="profile-form__field">
          Email
          <input
            id="email"
            type="email"
            name="email"
            value={email || ""}
            onChange={handleEmailChange}
            placeholder="pochta@yandex.ru"
            className="profile-form__info"
            minLength={2}
            maxLength={40}
            required
            disabled={!isEditing}
          />
        </label>

        <span className="profile-form__error">
          {errors.name || errors.email || textError}
        </span>

        {isEditing ? (
          <button
            className={`profile-form__save`}
            type="submit"
            disabled={!activeButton || !isValid}
          >
            Сохранить
            {/* {isLoading ? "Сохранить" : "Сохранение..."} */}
          </button>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="profile-form__change"
              type="submit"
            >
              Редактировать
            </button>
            <button onClick={signOut} className="profile__signin-link">
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </main>
  );
}
export default Profile;
