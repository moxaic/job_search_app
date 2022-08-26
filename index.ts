import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import isAuthenticated from './src/middlewares/isAuthenticated';
import home from './src/routes/home.routes';
import jobs from './src/routes/jobs.routes';
import login from './src/routes/login.routes';
import profile from './src/routes/profile.routes';
import register from './src/routes/register.routes';
import logout from './src/routes/logout.routes';
import explore from './src/routes/explore.routes';
import myApplications from './src/routes/myApplications.routes';

const PORT = process.env.PORT!;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.json());
app.use(isAuthenticated);
app.use('/', home);
app.use('/explore', explore);
app.use('/my_applications', myApplications);
app.use('/profile', profile);
app.use('/jobs', jobs);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
