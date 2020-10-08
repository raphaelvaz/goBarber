import { startOfDay } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';

//DTO
interface IResquest {
    provider_id: string;
    date: Date;
}
@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }
    public async execute({ provider_id, date }: IResquest): Promise<Appointment> {
        const appointmentDate = startOfDay(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
        if (findAppointmentInSameDate) throw new AppError("This Appointment is already booked");

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        return appointment;
    }
}
export default CreateAppointmentService;