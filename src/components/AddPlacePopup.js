import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, renderLoading }) {
/*   const placeNameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        //Значение инпута, полученное с помощью рефа
        name: placeNameRef.current.value,
        link: linkRef.current.value
    });
  } */

  //-----------------
  const [name, setName] = React.useState("");
  const [link, setlink] = React.useState("");

  function handleSubmit(e) {
    //Запрещаем браузеру переходить по адресу формы
    e.preventDefault(); 
    //Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
        name,
        link,
    });
  }

  function handlePlaceName(e) {
    setName(e.target.value);
  }

  function handleLinkImage(e) {
    setlink(e.target.value);
  }

  //После загрузки текущего пользователя из API
  //его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName("");
    setlink("");
  }, [isOpen]);
  //--------------------------

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
        value={name || ''}
        onChange={handlePlaceName}
      />
      <span id="place-input-error" className="popup__error-input" />

      <input
        id="link-input"
        required=""
        className="popup__input popup__input_type_link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        value={link  || ''}
        onChange={handleLinkImage}
      />
      <span id="link-input-error" className="popup__error-input" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;