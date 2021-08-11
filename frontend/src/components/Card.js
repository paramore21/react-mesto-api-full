import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardDelete, onCardLike}) {
  let {name, link, _id, likes, owner} = card
  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick({name, link, isOpen: true})
  }

  const handleCardDelete = () => {
    onCardDelete(_id)
  }

  const handleCardLike = () => {
    onCardLike(card, !isLiked)
  }

  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `${isLiked ? 'element__like-button element__like-button_active' : 'element__like-button'}`;
  
  const isOwn = owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__delete-button ${isOwn ? 'element__delete' : 'element__hidden'}`
  ); 

  return (
    <div className="element">
      <img className="element__image" src={link} alt={name} onClick={handleCardClick}/>
      <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
      <h2 className="element__title">{name}</h2>
      <div className="element__likes">
        <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike}></button>
        <p className="element__like-count">{likes.length}</p>
      </div>  
    </div>
  )
}

export default Card