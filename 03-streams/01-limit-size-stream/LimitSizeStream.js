const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.passedBytes = 0;
  }

  _transform(chunk, encoding, callback) {
    this.passedBytes += chunk.length;

    if (this.passedBytes > this.limit) {
      return callback(new LimitExceededError());
    }

    return callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
