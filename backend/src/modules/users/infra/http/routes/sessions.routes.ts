import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

// Receber a requisição , chama outro arquivo , devolve a resposta.
sessionsRoutes.post('/', async (request, response) => sessionsController.create)

export default sessionsRoutes;
