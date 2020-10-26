import { Router } from 'express';

import appointsmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRoutes from 'modules/appointments/infra/http/routes/providers.routes'
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointments', appointsmentRouter);
routes.use('/providers', providersRoutes);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
