import { Router } from 'express';
import { applyJob } from '../controllers/jobs';

const jobs = Router();

jobs.get('/apply/:id', applyJob);

export default jobs;
