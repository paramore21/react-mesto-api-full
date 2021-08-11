const Card = require('../models/card');
const BadRequest = require('../errors/bad-request');
const NotFound = require('../errors/not-found');
const Forbidden = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Ошибка валидации');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ownerId = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFound('Карточка по данному id не найдена');
    })
    .then((card) => {
      if (ownerId.toString() === card.owner._id.toString()) {
        Card.deleteOne(card).then(() => {
          res.send({ data: card });
        });
      } else {
        throw new Forbidden('Недостаточно прав');
      }
    })
    .catch((err) => next(err));
};

module.exports.setLike = (req, res, next) => {
  const id = req.user._id;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFound('Карточка по данному id не найдена');
    })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Неверные данные');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};

module.exports.removeLike = (req, res, next) => {
  const id = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: id } }, { new: true })
    .orFail(() => {
      throw new NotFound('Карточка по данному id не найдена');
    })
    .then((card) => {
      if (!card) {
        throw new BadRequest('Неверные данные');
      }
      res.send({ data: card });
    })
    .catch((err) => next(err));
};
