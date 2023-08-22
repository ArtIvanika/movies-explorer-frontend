import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import {
  INTERNAL_SERVER_ERROR_500,
  BAD_REQUEST_400,
  CONFLICT_409,
  emailRegex,
} from "../../utils/constants";

function Profile({ signOut, isWaiting, onUpdateUser, error, textErrorUser, setTextErrorUser}) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    if ((values.name !== currentUser.name || values.email !== currentUser.email)) {
        setActiveButton(true)
    } else {
        setActiveButton(false)
    }
}, [currentUser, values, isEditing]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email } = values;
    if (isValid) {
      onUpdateUser({name, email});
    }
}

  useEffect(() => {
    if (error === 400) {
      setTextErrorUser(BAD_REQUEST_400);
    }
    if (error === 409) {
      setTextErrorUser(CONFLICT_409);
    }
    if (error === 500) {
      setTextErrorUser(INTERNAL_SERVER_ERROR_500);
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
             value={values.name = values.name || currentUser.name || ''}
            onChange={handleChange}
            placeholder="Виталий"
            className="profile-form__info"
            minLength={2}
            maxLength={40}
            required
            disabled={!isEditing || isWaiting}
          />
        </label>
        <hr className="profile-form__line"></hr>
        <label className="profile-form__field">
          Email
          <input
            id="email"
            type="email"
            name="email"
            value={values.email = values.email || currentUser.email || ''}
            onChange={handleChange}
            placeholder="pochta@yandex.ru"
            className="profile-form__info"
            minLength={2}
            maxLength={40}
            required
            pattern="[a-z0-9]+@[a-z]+\.[a-z]{2,}"
            disabled={!isEditing || isWaiting}
          />
        </label>

        <span className="profile-form__error">
          {errors.name || errors.email || textErrorUser}
        </span>

        {isEditing ? (
          <button
            className={`profile-form__save 
            ${activeButton && isValid ? "" : "profile-form__save_disabled"} 
            `}
            type="submit"
            disabled={!activeButton || !isValid || isWaiting}
          >
            Сохранить
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
