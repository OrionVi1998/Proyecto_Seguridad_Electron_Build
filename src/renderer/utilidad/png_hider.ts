// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PNG } from 'pngjs/browser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { stringToBinary, binaryToString } from './binaryConversion';

// let {stringToBinary, binaryToString} = require('./binaryConversion.js')

function encode(buffer: any, message: any) {
  return new Promise((resolve) => {
    new PNG({ filterType: 4 }).parse(buffer, function (_error: any, data: any) {
      // eslint-disable-next-line no-param-reassign
      message = stringToBinary(message);
      // eslint-disable-next-line no-param-reassign
      message = message
        .split('')
        .map((n: any) => Number(n))
        .reverse(); // Array of 1s and 0s

      let pointer = data.height * data.width - message.length + 1;
      let count = 0;

      for (let y = 0; y < data.height; y += 1) {
        for (let x = 0; x < data.width; x += 1) {
          // eslint-disable-next-line no-bitwise
          const idx = (data.width * y + x) << 2;

          count += 1;
          // Modifies alpha channel
          if (count === pointer) {
            pointer += 1;
            // console.log("pops", message.length)
            data.data[idx + 3] = 255 - message.pop();
          } else {
            data.data[idx + 3] = 255;
          }
        }
      }
      resolve(data);
    });
  });
}

function decode(buffer: any) {
  return new Promise((resolve) => {
    new PNG({ filterType: 4 }).parse(buffer, function (_error: any, data: any) {
      let message: any = [];
      let hasMessage = false;

      for (let y = 0; y < data.height; y += 1) {
        for (let x = 0; x < data.width; x += 1) {
          // eslint-disable-next-line no-bitwise
          const idx = (data.width * y + x) << 2;

          // Modifies alpha channel

          if (data.data[idx + 3] === 254) {
            hasMessage = true;
          }
          if (hasMessage) {
            message.push(255 - data.data[idx + 3]);
          }
        }
      }

      message.reverse();
      message.push(0);
      message = message.reverse().join('');
      resolve(binaryToString(message));
    });
  });
}

export { encode, decode };
