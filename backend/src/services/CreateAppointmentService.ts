import { startOfDay } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';


//DTO
interface Resquest {
    provider_id: string;
    date: Date;
}
//single responsibility principle
//service nunca deve ter acesso a request,response;
class CreateAppointmentService {
    //só deve ter um uníco método
    public async execute({provider_id, date}:Resquest): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfDay(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
        if (findAppointmentInSameDate) throw Error("This Appointment is already booked");

        const appointment = appointmentsRepository.create({ 
            provider_id,
            date: appointmentDate 
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}
export default CreateAppointmentService;
