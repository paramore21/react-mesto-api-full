import React, { useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      isOpen={isOpen}
      formName='profile'
      title='Редактировать профиль'
      buttonName='Сохранить'
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    <input type="text" value={name || ""} onChange={handleNameChange} className="popup__edit popup__edit_type_name popup__input" name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
    <span className="popup__error" id="popup__name__error"></span>
    <input type="text" value={description || ""} onChange={handleDescriptionChange} className="popup__edit popup__edit_type_description popup__input" name="about" placeholder="О себе" required minLength="2" maxLength="200"/>
    <span className="popup__error" id="popup__about__error"></span>
  </PopupWithForm>
)}

export default EditProfilePopup