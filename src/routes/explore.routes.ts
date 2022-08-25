import { Router } from 'express';
import { getExplore, getFilteredJobs } from '../controllers/explore';

const explore = Router();

explore.get('/', getExplore);
explore.get('/filter', getFilteredJobs);

export default explore;
