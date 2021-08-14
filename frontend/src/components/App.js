import {useEffect, useState} from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as auth from "../utils/auth"
import Main from "./Main"
import Footer from './Footer'
import ImagePopup from "./ImagePopup"
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/api"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({isOpen: false})
  const [currentUser, setCurrentUser] = useState({})
  const [currentEmail, setCurrentEmail] = useState("")
  const [cards, setCards] = useState([])
  const [infoTooltipState, setInfoTooltipState] = useState({opened: false, sucess: false})
  const [loggedIn, setLoggedIn] = useState(false)
  const history = useHistory()
  
  function handleRegister({email, password}){
    auth.register(email, password).then(() => {
      setInfoTooltipState({ opened: true, success: true })
      history.push("/login")
    })  
    .catch(err => {
      console.log(err)
      setInfoTooltipState({ opened: true, success: false })
    })
  }
  
  function handleLogin({email, password}){
    auth.login(email, password).then((res) => {
      localStorage.setItem('token', `${res.token}`)
      setCurrentEmail(email)
      setLoggedIn(true)
      history.push("/")
    })
    .catch(err => console.log(err))
  }
  
  function handleLogout () {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setCurrentEmail('');
    history.push('/sign-in');
  }
 
  useEffect(() => {
    const token = localStorage.getItem('token')
    auth.checkToken(token)
    .then(res => {
      if(res){
        setCurrentUser(res)
        setLoggedIn(true)
        history.push('/')
      }
    })
  }, [loggedIn])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token && loggedIn) {
      api.getInitialCards()
      .then((data) => {
        setCards(data.data)
      })
      .catch((err) => {console.log(err)})
    }

  }, [loggedIn])

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopups(){
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard({isOpen: false})
    setInfoTooltipState({opened: false, sucess: false})
  }

  function handleCardClick(card){
    setSelectedCard(card)
  }

  const handleCardDelete = (id) => {
    return api.deleteCard(id)
    .then(() => {
      const anotherCards = cards.forEach(card => {
        console.log("handle delete", card._id, id)
      });
      console.log(anotherCards)
      const newCards = cards.filter(card => card._id !== id)
      setCards(newCards)
    })
    .catch(err => console.log(err))
  }

  function handleCardLike(card, isLiked) { 
    const {_id} = card
    api.changeLikeStatus(_id, isLiked).then((newCard) => { 
      setCards((state) => state.map((c) => c._id === _id ? newCard.data : c)); 
    }) 
    .catch(err => console.log(err)); 
  } 

  function handleUpdateUser({name, about}) {
    return api.updateUserInformation(name, about).then((res) => {
      setCurrentUser(res.data)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    console.log(avatar)
    return api.updateUserAvatar(avatar).then((res) => {
      setCurrentUser(res.data)
      closeAllPopups()
    })
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit({place, link}) {
    return api.addNewCardToServer(place, link).then((res) => {
      setCards([res.data, ...cards]);
      closeAllPopups()
    })
    .catch(err => console.log(err)) 
  }

  

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser} >
        <Switch>
          <ProtectedRoute exact path="/" 
            loggedIn={loggedIn}
            component={Main} 
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            cards={cards}
            email={currentEmail}
            onLogout={handleLogout}
          />

          <Route path="/register">
            <Register onRegister={handleRegister}/>
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />} 
          </Route>
        </Switch>
        <Footer />

        <EditAvatarPopup />
        <AddPlacePopup onCardCreate={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <ImagePopup 
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip isOpen={infoTooltipState.opened} onClose={closeAllPopups} isAuthSuccess={infoTooltipState.success} />  
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
