import { Request } from 'express';
import db from '../config/db';
import { Res } from '../utils/types';

export const getExplore = async (req: Request, res: Res) => {
  res.render('explore', { title: 'Explore' });
};

export const getFilteredJobs = async (req: Request, res: Res) => {
  const { companyName, jobLocation, salary, cgpa } = req.query;
  let query = 'SELECT * FROM jobs WHERE ';

  if (companyName) query += `company_name LIKE '%${companyName}%'`;
  if (jobLocation) {
    if (companyName) query += ' AND ';
    query += `job_location LIKE '%${jobLocation}%'`;
  }
  if (salary) {
    if (companyName || jobLocation) query += ' AND ';
    query += `salary >= ${salary}`;
  }
  if (cgpa) {
    if (companyName || jobLocation || salary) query += ' AND ';
    query += `(eligibility_criteria IS NULL OR eligibility_criteria <= ${cgpa})`;
  }

  try {
    const [rows] = await db.query(query);
    res.render('explore', { title: 'Results', jobListings: rows });
  } catch (err) {
    console.error(err);
  }
};
