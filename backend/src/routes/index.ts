import { Router } from 'express';

import appointsmentRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointsmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions',sessionRouter);

export default routes;
