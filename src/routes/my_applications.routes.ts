import { Router } from 'express';
import { getMyApplications } from '../controllers/my_applications';

const myApplications = Router();

myApplications.get('/', getMyApplications);

export default myApplications;
