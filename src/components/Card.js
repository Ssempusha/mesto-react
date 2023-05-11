import React from "react";

export function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="template-card">
      <li className="cards-grid__item">
        <img className="cards-grid__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
        <button type="button" className="cards-grid__delete" />
        <div className="cards-grid__elements-box">
          <h2 className="cards-grid__title">{props.card.name}</h2>
          <div className="cards-grid__elements-like">
            <button type="button" className="cards-grid__like" />
            <p className="cards-grid__like-number">{props.card.likes.length}</p>
          </div>
        </div>
      </li>
    </div>
  );
}