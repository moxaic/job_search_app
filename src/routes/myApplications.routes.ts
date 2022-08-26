import { Router } from 'express';
import { getMyApplications } from '../controllers/myApplications';

const myApplications = Router();

myApplications.get('/', getMyApplications);

export default myApplications;
