import React, { useState } from "react"
import '../index.css';
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
 
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="body">
    <div className="page">

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm 
        title={"Редактировать профиль"}
        name={"profile"}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText={"Сохранить"}
      >
        <input
          id="name-input"
          required=""
          minLength="2"
          maxLength="40"
          name="name"
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Имя"
          defaultValue=""
        />
        <span id="name-input-error" className="popup__error-input" />

        <input
          id="job-input"
          required=""
          minLength="2"
          maxLength="200"
          name="about"
          className="popup__input popup__input_type_job"
          type="text"
          placeholder="О себе"
          defaultValue=""
        />
        <span id="job-input-error" className="popup__error-input" />
      </PopupWithForm>

      <PopupWithForm 
        title={"Новое место"}
        name={"addin-card"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText={"Создать"}
      >
        <input
          id="place-input"
          required=""
          minLength="2"
          maxLength="30"
          className="popup__input popup__input_type_place"
          type="text"
          placeholder="Название"
          defaultValue=""
          name="name"
        />
        <span id="place-input-error" className="popup__error-input" />

        <input
          id="link-input"
          required=""
          className="popup__input popup__input_type_link"
          type="url"
          placeholder="Ссылка на картинку"
          defaultValue=""
          name="link"
        />
        <span id="link-input-error" className="popup__error-input" />
      </PopupWithForm>

      <PopupWithForm 
        title={"Обновить аватар"}
        name={"edit-avatar"}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText={"Сохранить"}
      >
        <input
          id="avatar-input"
          required=""
          className="popup__input popup__input_type_link-avatar"
          type="url"
          placeholder="Ссылка на картинку"
          defaultValue=""
          name="avatar"
        />
        <span id="avatar-input-error" className="popup__error-input" />
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>
    </div>
  );
}

export default App;
