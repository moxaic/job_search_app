import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profile';

const profile = Router();

profile.get('/', getProfile);
profile.post('/update', updateProfile);

export default profile;
