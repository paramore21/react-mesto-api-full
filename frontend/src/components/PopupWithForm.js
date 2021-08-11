function PopupWithForm({title, children, buttonName, isOpen, formName, onClose, onSubmit}) {

  return (
    <section className={isOpen ? `popup popup_type_${formName} popup_opened` : `popup popup_type_${formName}`}>
      <div className="popup__container">
        <h2 className="popup__edit-profile">{title}</h2>
        <form className="popup__form" name={formName} onSubmit={onSubmit}>
          <button className="popup__close-form" type="button" onClick={onClose}></button>
          {children}
          <button type="submit" className="popup__submit">{buttonName}</button>
        </form>
      </div>
    </section>
)}

export default PopupWithForm