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
  // ошибка была в этом месте, avatar был объектом модуля validator.
  // Решила оставить проверку по регулярке.
    avatar: Joi.string().required()
      .regex(/^(https?:\/\/)?([\da-z\\.-]+)\.([a-z\\.]{2,6})([\\/\w \\.-]*)*\/?$/),
  }),
}),
updateAvatar);

router.get('users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().min(24)
      .max(24),
  }),
}), getUserById);
module.exports = router;
