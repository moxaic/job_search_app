import { Request } from 'express';
import db from '../config/db';
import { Res } from '../utils/types';

export const getProfile = async (req: Request, res: Res) => {
  res.render('profile', { title: 'Profile' });
};

export const updateProfile = async (req: Request, res: Res) => {
  const { name, cgpa } = req.body;
  let query = 'UPDATE `users` SET ';
  const values: string[] = [];

  if (name) {
    query += '`fullname` = ?';
    values.push(name);
  }
  if (cgpa) {
    if (name) query += ', ';
    query += '`cgpa` = ?';
    values.push(cgpa);
  }

  try {
    if (values) {
      query += ` WHERE \`email\` = ?`;
      if (typeof res.user === 'object') values.push(res.user.email);
      await db.execute(query, values);
      res.redirect('/profile');
    }
  } catch (err) {
    console.error(err);
  }
};
