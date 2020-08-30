import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAutheticanted from '../middlewares/ensureAuthenticated';

const appointmentsRoutes = Router();

appointmentsRoutes.use(ensureAutheticanted);

appointmentsRoutes.get('/', async (request, response) => {
    console.log(request.user);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    response.json(appointments);
})

// Receber a requisição , chama outro arquivo , devolve a resposta.
appointmentsRoutes.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;
        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();
        const appointment = await createAppointmentService.execute({ 
            provider_id, 
            date: parsedDate
        })

        response.json(appointment);
    }catch (err) {
        return response.status(400).json({ error: err.message});
    }
})

export default appointmentsRoutes;
