import sucess from "../images/sucess.svg"
import fail from "../images/fail.svg"

function InfoTooltip({isOpen, onClose, isAuthSuccess}) {
  return (
    <section className={isOpen ? `tooltip tooltip_opened` : `tooltip`}>
      <div className="tooltip__container">
        <button type="button" className="popup__close-form" onClick={onClose}></button>
        <img src={isAuthSuccess ? `${sucess}` : `${fail}`} alt={isAuthSuccess ? 'success' : 'fail'}/>
        <p className="tooltip__title">{isAuthSuccess ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз`}</p>
      </div>  
    </section>
  )
}
export default InfoTooltip