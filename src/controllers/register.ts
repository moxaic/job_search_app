import { Request } from "express";
import { Res } from "../utils/types";
import {
  createUser,
  generateSalt,
  jwtSignToken,
  sha256,
} from "../utils/helpers";

export const getRegister = (req: Request, res: Res) => {
  res.render("register", { title: "Register" });
};

export const postRegister = async (req: Request, res: Res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const salt = generateSalt();
  const saltedPassword = salt.concat(password[0]);
  await createUser(email, fname + " " + lname, sha256(saltedPassword), salt);
  const token = {
    name: fname + " " + lname,
    email,
  };
  await jwtSignToken(res, token);
};
