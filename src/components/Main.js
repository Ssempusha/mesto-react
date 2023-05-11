import React from "react"
import { api } from "../utils/Api"
import {Card} from "./Card"

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
      }, []);
  
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

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__box">
          <div className="profile__avatar-box">
            <img className="profile__avatar" src={userAvatar} alt="Фото профиля" />
            <button type="button" className="profile__avatar-edit" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info-box">
            <div className="profile__info-heading">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__occupation">{userDescription}</p>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      
      <section className="places">
        <ul className="cards-grid">
          {cards.map((card) => ( <Card key={card._id} card={card} onCardClick={props.onCardClick} /> ))}
        </ul>
      </section>
    </main>
    )
  }

export default Main