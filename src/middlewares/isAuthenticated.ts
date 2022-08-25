import { NextFunction, Request } from 'express';
import path from 'path';
import { readFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import { cookieExtractor } from '../utils/helpers';
import { Res } from '../utils/types';

const isAuthenticated = async (req: Request, res: Res, next: NextFunction) => {
  const pubKey = await readFile(path.join(__dirname, '..', '..', 'pub.pem'));
  const token = cookieExtractor(req);

  if (!token)
    if (req.url === '/login' || req.url === '/register') return next();
    else return res.redirect('/login');

  jwt.verify(token, pubKey, (err, token) => {
    if (err) {
      console.error(err);
      res.redirect('/login');
      return;
    }
    res.user = token;
    if (req.url === '/login' || req.url === '/register')
      return res.redirect('/');

    console.log('isAuthenticated-> token: ', token);
    next();
  });
};

export default isAuthenticated;
