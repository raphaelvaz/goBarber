import { Router } from 'express';

import ensureAutheticanted from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRoutes = Router();
const appointmentsController = new AppointmentsController();

appointmentsRoutes.use(ensureAutheticanted);

// appointmentsRoutes.get('/', async (request, response) => {
//     console.log(request.user);

//     const appointments = await appointmentsRepository.find();

//     response.json(appointments);
// })

appointmentsRoutes.post('/', async (request, response) => appointmentsController.create)

export default appointmentsRoutes;
