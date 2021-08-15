const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUser, updateUser, updateAvatar, getUserById,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}),
updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^((http|https)?:\/\/)(w{3}\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)?\/?#?/),
  }),
}),
updateAvatar);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().min(24)
      .max(24),
  }),
}), getUserById);
module.exports = router;
