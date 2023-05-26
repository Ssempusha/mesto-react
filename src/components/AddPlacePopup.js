import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, renderLoading }) {
  const placeNameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        /* Значение инпута, полученное с помощью рефа */
        name: placeNameRef.current.value,
        link: linkRef.current.value
    });
  }

  return (
    <PopupWithForm 
      title="Новое место"
      name="addin-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      renderLoading={renderLoading}
      >
      <input
        id="place-input"
        required=""
        minLength="2"
        maxLength="30"
        className="popup__input popup__input_type_place"
        type="text"
        placeholder="Название"
        name="name"
        ref={placeNameRef}
      />
      <span id="place-input-error" className="popup__error-input" />

      <input
        id="link-input"
        required=""
        className="popup__input popup__input_type_link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        ref={linkRef}
      />
      <span id="link-input-error" className="popup__error-input" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;