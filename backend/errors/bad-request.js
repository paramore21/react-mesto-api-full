class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    console.dir(message)
  }
}

module.exports = BadRequest;
