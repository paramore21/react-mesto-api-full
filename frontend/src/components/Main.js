import React from "react";
import { CurrentUserContext} from "../contexts/CurrentUserContext";
import Card from "./Card"
import Header from "./Header";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, cards, onCardLike, email, onLogout}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <p className="header__mail">{email}</p>
        <button className="header__button" onClick={onLogout}>Выйти</button>
      </Header>
      <main className="main">
        <section className="profile">
          <p className="profile__avatar" href="#" target="_blank" onClick={onEditAvatar} style={{backgroundImage: `url(${currentUser.avatar})`}}></p>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <h2 className="profile__description">{currentUser.about}</h2>
          </div>
          <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          <button type="button" className="profile__add-card" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          {cards.map((card, _id) => (
            <Card
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes}
              onCardClick={onCardClick}
              key={card._id} 
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default Main
