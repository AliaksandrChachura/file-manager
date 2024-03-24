import { createBrotliCompress } from 'node:zlib';
import {
    createReadStream,
    createWriteStream
} from 'node:fs';
import { resolve } from 'path';

const zipHandler = {
 compress: (
  sourceFilePath,
  targetFilePath
  ) => {
   createReadStream(resolve(process.cwd(), "src/state", sourceFilePath))
    .pipe(createBrotliCompress())
    .pipe(createWriteStream(resolve(process.cwd(), "src/state", targetFilePath)))
    .on('finish', () => {
     console.log('File compressed successfully.');
    });
  },
 decompress: (
  sourceFilePath,
  targetFilePath
 ) => {
  createReadStream(resolve(process.cwd(), "src/state", sourceFilePath))
   .pipe(createBrotliCompress())
   .pipe(createWriteStream(resolve(process.cwd(), "src/state", targetFilePath)))
   .on("finish", async () => {
       console.log("Decompression done!");
    });
 }
};

export { zipHandler };
