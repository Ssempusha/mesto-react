import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={`form-${props.name}`} noValidate="">
          {props.children}
          <button type="submit" className="popup__button-save">{props.buttonText}</button>
        </form>
        <button type="button" className="popup__cross" onClick={props.onClose}/>
      </div>
    </div>
  )
}

export default PopupWithForm