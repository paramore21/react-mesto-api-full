const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const NotFound = require('../errors/not-found');
const NoAuth = require('../errors/no-auth');

const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email }).then((findedUser) => {
    if (findedUser) {
      res
        .status(409)
        .send({ message: 'Такой пользователь уже зарегистрирован.' });
    }
  });
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        if (!user) {
          next(new BadRequest('Пользователь не найден'));
        }
        res.send({ _id: user._id });
      })
      .catch((err) => next(err));
  });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Неверные данные');
      }
      res.send({ data: user });
    })
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        throw new BadRequest('Ошибка валидации');
      }
      res.send({ data });
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NotFound('Пользователь не найден');
  }
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new NoAuth('Неверная почта или пароль');
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NoAuth('Неверная почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.send({ token });
        })
        .catch((err) => next(err));
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному id не найден');
    })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Произошла ошибка');
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному id не найден');
    })
    .then((user) => {
      if (!user) {
        throw new BadRequest('Произошла ошибка');
      }
      res.send({ data: user });
    })
    .catch((err) => next(err));
};
