import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { provider_id, date } = request.body;

        const createAppointmentService = container.resolve(CreateAppointmentService);

        const appointment = await createAppointmentService.execute({
            provider_id,
            user_id,
            date,
        })

        return response.json(appointment);
    }
}
