function stringToBinary(input: string) {
  /* String a binario */
  const characters = input.split('');

  return characters
    .map(function (char) {
      const binary = char.charCodeAt(0).toString(2);
      const pad = Math.max(8 - binary.length, 0);
      return '0'.repeat(pad) + binary;
    })
    .join('');
}

function binaryToString(input: string) {
  /* String binario a string ascii */
  let bytesLeft = input;
  let result = '';

  while (bytesLeft.length) {
    const byte = bytesLeft.slice(0, 8);
    bytesLeft = bytesLeft.slice(8);

    result += String.fromCharCode(parseInt(byte, 2));
  }

  return result;
}

module.exports = { stringToBinary, binaryToString };
