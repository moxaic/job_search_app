import { Request } from 'express';
import db from '../config/db';
import { getHexFormat } from '../utils/helpers';
import { Res } from '../utils/types';

export const applyJob = async (req: Request, res: Res) => {
  const { id } = req.params;
  const jobId = getHexFormat(id);
  const query = `SELECT id FROM jobs WHERE id = ${jobId};`;

  try {
    const [job] = await db.query(query);
    const jobId = getHexFormat((job as any)[0].id.toString('hex'));

    if (job) {
      let userId: string;
      if (typeof res.user === 'object') {
        const userEmail = res.user.email;
        const [user] = await db.query(
          'SELECT `id` FROM `users` WHERE `email` = ?',
          [userEmail]
        );
        userId = getHexFormat((user as any)[0].id.toString('hex'));
        const insertQuery = `INSERT INTO applications (user_id, job_id) VALUES (${userId}, ${jobId})`;
        await db.query(insertQuery);
        res.redirect('/my_applications');
      }
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
  }
};
