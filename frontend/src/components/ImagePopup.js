function ImagePopup({card, onClose}) {
  return (
    <section className={`image popup popup_type_image ${card.isOpen ? 'popup_opened' : ''}`}>
    <div className="image__container image__container_type_image">
      <button type="button" className="popup__close-form" onClick={onClose}></button>
      <img className="image__item" src={card.link} alt={card.name}/>
      <h3 className="image__title">{card.name}</h3>
    </div>
  </section> 
  )
}

export default ImagePopup