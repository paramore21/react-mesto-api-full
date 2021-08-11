const editContainer = document.querySelector(".popup_type_edit")    /* контейнер формы*/ 
const placeContainer = document.querySelector(".popup_type_place")  /* контейнер добавления карточки*/ 
const userAvatarContainer = document.querySelector(".popup_type_avatar")

export const elementsSelector = ".elements"       /* тут карточки */

export const profileName = ".profile__name"       /* селектор -- имя на странице */
export const profileDescription = ".profile__description"     /* селектор -- описание на странице */
export const userAvatar = ".profile__avatar" /* селектор аватара */

export const editButton = document.querySelector(".profile__edit-button")           /* кнопка изменить, открытие формы */
export const addCardButton = document.querySelector(".profile__add-card")           /* кнопка добавить карту */

export const editName = editContainer.querySelector(".popup__edit_type_name")
export const editDescription = editContainer.querySelector(".popup__edit_type_description")
export const editSubmit = editContainer.querySelector(".popup__submit")
export const cardSubmitButton = placeContainer.querySelector(".place__submit")
export const editAvatarSubmitButton = userAvatarContainer.querySelector(".avatar__submit")
export const deleteSubmitButton = document.querySelector(".delete__submit")
export const cardSelector = "#template__card"

export const formEditClassName = ".popup_type_edit" /* селектор попапа изменения информации*/ 
export const cardEditClassName = ".popup_type_place" /* селектор попапа карточки*/ 
export const imageContainer = ".popup_type_image"  /* селектор попапа картинки*/ 
export const deleteContainer = ".popup_type_delete"
export const avatarContainer = ".popup_type_avatar"
export const avatarButton = document.querySelector(userAvatar)