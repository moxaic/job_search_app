import { Request } from 'express';
import db from '../config/db';
import { getHexFormat } from '../utils/helpers';
import { Res } from '../utils/types';

export const getHome = async (req: Request, res: Res) => {
  let name = 'Test User';
  let email = '';

  if (typeof res.user === 'object') {
    name = res.user.name;
    email = res.user.email;
  }

  try {
    const [user] = await db.execute(
      'SELECT `id` FROM `users` WHERE `email` = ?',
      [email]
    );
    const id = getHexFormat((user as any)[0].id.toString('hex'));
    const [jobListings] = await db.query(
      `SELECT * FROM jobs WHERE jobs.id NOT IN ( SELECT job_id FROM applications WHERE applications.user_id = ${id} )`
    );
    (jobListings as any[]).forEach(job => (job.id = job.id.toString('hex')));
    res.render('home', { title: 'Home', name, jobListings });
  } catch (err) {
    console.error(err);
  }
};
