const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.stringTail = '';
  }

  _transform(chunk, encoding, callback) {
    this.stringTail += chunk;
    const strings = this.stringTail.toString().split(os.EOL);

    this.stringTail = strings.pop();
    if (strings.length > 0) {
      callback(null, strings.shift());
      strings.forEach((str) => this.push(str));
    } else {
      callback(null, null);
    }
  }

  _flush(callback) {
    callback(null, this.stringTail);
  }
}

module.exports = LineSplitStream;

