import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/api/users', UserController.store);
routes.post('/api/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/api/users', UserController.update);

routes.post('/api/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
