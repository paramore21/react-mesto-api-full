class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
    headers: this._headers
  })
    .then(this._checkResponse);
  }  
  
  getUserInformation(){
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "GET",
    })
    .then(this._checkResponse)
  }

  updateUserInformation(name, about){
    return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
    })
    .then(this._checkResponse);
  }

  addNewCardToServer(name, link){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })  
    .then(this._checkResponse);
  }

  updateUserAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse);
  }

  changeLikeStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`,{
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInformation()]);
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  headers: {
    authorization: '5cec2cfc-4275-45ab-817c-d3d0a479cabd',
    'Content-Type': 'application/json'
  }
});

export default api