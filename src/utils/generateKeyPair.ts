import path from "path";
import { writeFile } from "fs";
import { generateKeyPair } from "crypto";

generateKeyPair(
  "rsa",
  {
    modulusLength: 4086,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  },
  (err, pubKey, priKey) => {
    if (err) {
      throw err;
    }
    writeFile(path.join(__dirname, "..", "..", "pub.pem"), pubKey, (err) => {
      if (err) {
        throw err;
      }
      console.log("public key created");
    });
    writeFile(path.join(__dirname, "..", "..", "pri.pem"), priKey, (err) => {
      if (err) {
        throw err;
      }
      console.log("private key created");
    });
  }
);
