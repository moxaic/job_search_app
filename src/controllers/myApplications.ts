import { Request } from 'express';
import db from '../config/db';
import { getHexFormat } from '../utils/helpers';
import { Res } from '../utils/types';

export const getMyApplications = async (req: Request, res: Res) => {
  let email = '';
  if (typeof res.user === 'object') email = res.user.email;

  try {
    const [user] = await db.execute(
      'SELECT `id` FROM `users` WHERE `email` = ?',
      [email]
    );

    const id = getHexFormat((user as any)[0].id.toString('hex'));
    const [appliedJobs] = await db.query(
      `SELECT * FROM jobs INNER JOIN applications ON jobs.id = applications.job_id WHERE user_id = ${id}`
    );

    res.render('my_applications', { title: 'My Applications', appliedJobs });
  } catch (err) {
    console.error(err);
  }
};
