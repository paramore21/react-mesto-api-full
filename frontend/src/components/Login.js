import React, {useState} from "react";
import { Link } from "react-router-dom";
import Header from "./Header"
function Login({onLogin}){
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password});
  }
  return (
  <>
    <Header>
      <Link to="/register" className="header__button">Регистрация</Link>
    </Header>
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <input type="email" value={email || ""} onChange={handleEmailChange} className="login__input" name="email" placeholder="Email" required minLength="2" maxLength="40"/>
        <span className="login__error" id="login__email__error"></span>
        <input type="password" value={password || ""} onChange={handlePasswordChange} className="login__input" name="password" placeholder="Пароль" required minLength="2" maxLength="200"/>
        <span className="login__error" id="login__password__error"></span>
        <button type="submit" className="login__submit">Войти</button>
      </form>
    </section>
  </>)
}

export default Login