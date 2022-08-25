import { Request } from 'express';
import db from '../config/db';
import { jwtSignToken, sha256 } from '../utils/helpers';
import { Res } from '../utils/types';

export const getLogin = (req: Request, res: Res) => {
  res.render('login', { title: 'Login' });
};

export const postLogin = async (req: Request, res: Res) => {
  const { email, password } = req.body;
  const [user] = await db.execute('SELECT * FROM `users` WHERE `email` = ?', [
    email,
  ]);

  if ((user as any).length === 0) res.redirect('/login');
  else {
    const tempUser: any = (user as any)[0];
    // verify password
    if (sha256(tempUser.salt.concat(password)) === tempUser.hash) {
      console.log('login-> user logged in');
      const token = {
        name: tempUser.fullname,
        email: tempUser.email,
      };
      await jwtSignToken(res, token);
    } else res.redirect('/login');
  }
};
