const isNumber = (number) => typeof number === 'number';

function sum(a, b) {
  if (isNumber(a) && isNumber(b)) {
    return a + b;
  }

  throw new TypeError();
}

module.exports = sum;
