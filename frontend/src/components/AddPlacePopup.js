import React, { useState } from "react"
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onCardCreate}) {

  const [place, setPlace] = useState("")
  const [link, setLink] = useState("")

  function handleNameChange(e) {
    setPlace(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onCardCreate({
      place,
      link,
    });
  } 

  return (
    <PopupWithForm
      isOpen={isOpen}
      formName='add_place'
      title='Новое место'
      buttonName='Сохранить'
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
    >
    <input type="text" onChange={handleNameChange} className="place__edit place__edit_type_place popup__input" name="name" value={place || ""} placeholder="Название" required minLength="2" maxLength="30"/>
    <span className="popup__error" id="place__name__error"></span>
    <input type="url" onChange={handleLinkChange} className="place__edit place__edit_type_url popup__input" name="link" value={link || ""} placeholder="Ссылка на картинку" required/>
    <span className="popup__error" id="place__link__error"></span>
  </PopupWithForm>
)}

export default AddPlacePopup