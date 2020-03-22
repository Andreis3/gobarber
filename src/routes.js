import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentControlller from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';

import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/api/users', UserController.store);
routes.post('/api/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/api/users', UserController.update);

routes.get('/api/providers', ProviderController.index);
routes.post('/api/appointements', AppointmentControlller.store);
routes.get('/api/appointements', AppointmentControlller.index);

routes.get('/api/schedules', ScheduleController.index);

routes.post('/api/files', upload.single('file'), FileController.store);

export default routes;
