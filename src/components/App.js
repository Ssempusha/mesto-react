import React, { useState } from "react";
import { api } from "../utils/Api";
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopup, setDeleteCardPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [renderLoading, setrenderLoading] = useState(false);

 //получаем и устанавливаем информацию о пользователе с сервера
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //запрос списка карточек
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cardsInfo) => {
        setCards(cardsInfo);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

  //лайк
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .likeCard(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //дизлайк
  function handleCardDislike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
    .dislikeCard(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //удаление карточки
  function handleConfirmCardDelete(card) {
    setrenderLoading(true);
    api
    .deleteCardFromServer(card._id)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setrenderLoading(false);
    })
  }

  //обработчик обновления инфы юзера
  function handleUpdateUser(data) {
    setrenderLoading(true);
    api
    .setInfoProfile(data)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setrenderLoading(false);
    })
  }

  //смена аватарки
  function handleUpdateAvatar(data) {
    setrenderLoading(true);
    api
    .updateAvatar(data)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setrenderLoading(false);
    })
  }

  //добавление карточки
  function handleAddPlaceSubmit(data) {
    setrenderLoading(true);
    api
    .createNewCard(data)
    .then((res) => {
      setCards([res, ...cards]); 
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setrenderLoading(false);
    })
  }
 
  //клик на кнопку редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //клик на кнопку добавления места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //клик на кнопку редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //клик на картинку карточки
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //клик на мусорку у карточки
  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setDeleteCardPopup(true);
  }
  
  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setDeleteCardPopup(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="body">
    <div className="page">

      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        cards={cards}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDislike={handleCardDislike}
        onCardDelete={handleConfirmCardDelete}
        onCardTrashClick={handleDeleteCardClick}
      />

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        renderLoading={renderLoading ? "Сохранение..." : "Сохранить"}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        renderLoading={renderLoading ? "Сохранение..." : "Создать"}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        renderLoading={renderLoading ? "Сохранение..." : "Сохранить"}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <ConfirmDeleteCardPopup
        isOpen={isDeleteCardPopup}
        onClose={closeAllPopups}
        onCardDelete={handleConfirmCardDelete}
        renderLoading={renderLoading ? "Удаление..." : "Да"}
        card={selectedCard}
      />

    </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
