import { startOfDay } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/appointmentsRepository';
import appointmentsRepository from '../repositories/appointmentsRepository';

//DTO
interface Resquest {
    provider: string;
    date: Date;
}
//single responsibility principle
//service nunca deve ter acesso a request,response;
class CreateAppointmentService {
    private appointmentsRepository : AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }
    //só deve ter um uníco método
    public execute({provider, date}:Resquest): Appointment {

        const appointmentDate = startOfDay(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) throw Error("This Appointment is already booked");

        const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

        return appointment;
    }
}
export default CreateAppointmentService;
