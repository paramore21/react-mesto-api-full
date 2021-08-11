const jwt = require('jsonwebtoken');
const NoAuth = require('../errors/no-auth');

const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new NoAuth('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    throw new NoAuth('Необходима авторизация');
  }
  req.user = payload;
  next();
};
