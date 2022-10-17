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

function decode() {
  // return new Promise((resolve, reject) => {
  //   readeableStream
  //     .pipe(
  //       new PNG({
  //         filterType: 4,
  //       })
  //     )
  //     .on('parsed', function () {
  //       let message = [];
  //       let hasMessage = false;
  //
  //       for (let y = 0; y < this.height; y++) {
  //         for (let x = 0; x < this.width; x++) {
  //           const idx = (this.width * y + x) << 2;
  //
  //           // Iterates over every pixel
  //           const originalPixel = `rgba(${this.data[idx]}, ${
  //             this.data[idx + 1]
  //           }, ${this.data[idx + 2]}, ${this.data[idx + 3]})`;
  //
  //           // Modifies alpha channel
  //
  //           if (this.data[idx + 3] === 254) {
  //             hasMessage = true;
  //           }
  //           if (hasMessage) {
  //             message.push(255 - this.data[idx + 3]);
  //           }
  //
  //           const modifiedPixel = `rgba(${this.data[idx]}, ${
  //             this.data[idx + 1]
  //           }, ${this.data[idx + 2]}, ${this.data[idx + 3]})`;
  //           // console.log(count,pointer, Math.round(count / (this.height * this.width)), modifiedPixel)
  //         }
  //       }
  //       console.log(message.reverse());
  //       message.push(0);
  //       message = message.reverse().join('');
  //       console.log(binaryToString(message));
  //
  //       resolve(this);
  //     });
  // });
}

export { encode, decode };
