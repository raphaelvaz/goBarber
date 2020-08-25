import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/appointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRoutes = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentRoutes.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    response.json(appointments);
})

// Receber a requisição , chama outro arquivo , devolve a resposta.
appointmentRoutes.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;
        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
        const appointment = createAppointmentService.execute({ provider, date: parsedDate })

        response.json(appointment);
    }catch (err) {
        return response.status(400).json({ error: err.message});
    }
})

export default appointmentRoutes;
