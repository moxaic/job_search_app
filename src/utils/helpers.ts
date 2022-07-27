import { Request, Response } from "express";
import path from "path";
import { readFile } from "fs/promises";
import { createHash, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import db from "../config/db";

export const cookieExtractor = (req: Request) =>
  req.cookies ? (req.cookies["token"] as string) : null;

export const createUser = (
  email: string,
  fullname: string,
  hash: string,
  salt: string
) =>
  db.execute(
    "INSERT INTO `users` (`email`, `fullname`, `hash`, `salt`) VALUES (?, ?, ?, ?)",
    [email, fullname, hash, salt]
  );

export const generateSalt = () => randomBytes(32).toString("hex");

export const jwtSignToken = async (res: Response, token: object) => {
  const priKey = await readFile(path.join(__dirname, "..", "..", "pri.pem"));
  jwt.sign(token, priKey, { algorithm: "RS256" }, (err, token) => {
    if (err) throw err;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 10000 * 10000,
      })
      .redirect("/");
  });
};

export const searchUser = (email: string) =>
  db.execute("SELECT * from `users` where `email` = ?", [email]);

export const sha256 = (data: string) =>
  createHash("sha256").update(data).digest("hex");
