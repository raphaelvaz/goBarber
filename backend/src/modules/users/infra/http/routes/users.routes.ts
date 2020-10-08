import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post('/', async (request, response) => usersController.create)

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
    async (request, response) => userAvatarController.update)

export default usersRoutes;
