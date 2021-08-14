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
    return fetch(`${this._url}/cards/${cardId}/likes`,{
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
}


const api = new Api({
  baseUrl: 'https://api.paramore2101.nomoredomains.club',
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

export default api