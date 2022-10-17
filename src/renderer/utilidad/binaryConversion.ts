function stringToBinary(input: string) {
  const characters = input.split('');

  return characters
    .map(function (char) {
      const binary = char.charCodeAt(0).toString(2);
      const pad = Math.max(8 - binary.length, 0);
      // Just to make sure it is 8 bits long.
      return '0'.repeat(pad) + binary;
    })
    .join('');
}

function binaryToString(input: string) {
  let bytesLeft = input;
  let result = '';

  // Check if we have some bytes left
  while (bytesLeft.length) {
    // Get the first digits
    const byte = bytesLeft.slice(0, 8);
    bytesLeft = bytesLeft.slice(8);

    result += String.fromCharCode(parseInt(byte, 2));
  }

  return result;
}

module.exports = { stringToBinary, binaryToString };
