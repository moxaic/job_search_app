import { Request } from 'express';
import db from '../config/db';
import { generateSalt, jwtSignToken, sha256 } from '../utils/helpers';
import { Res } from '../utils/types';

export const getRegister = (req: Request, res: Res) => {
  res.render('register', { title: 'Register' });
};

export const postRegister = async (req: Request, res: Res) => {
  const { fname, lname, email, password } = req.body;
  const salt = generateSalt();
  const saltedPassword = salt.concat(password[0]);

  // register user
  await db.execute(
    'INSERT INTO `users` (`email`, `fullname`, `hash`, `salt`) VALUES (?, ?, ?, ?)',
    [email, fname + ' ' + lname, sha256(saltedPassword), salt]
  );

  const token = {
    name: fname + ' ' + lname,
    email,
  };

  await jwtSignToken(res, token);
};
