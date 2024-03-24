import * as crypto from "node:crypto";
import {createReadStream} from "node:fs";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './errorHandler.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hashHandler = {
 hash: async (path) => {
  try {
   const dataStream = createReadStream(resolve(process.cwd(), "src/state", path));
   const hashSum = crypto.createHash("sha256");

   dataStream.pipe(hashSum).on("finish", () => {
    console.log(hashSum.digest("hex"));
   });
  } catch (e) {
   errorHandler(e, "ENOENT");
  };
  
 }
};

export { hashHandler };
