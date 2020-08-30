import Appointment from '../models/Appointment';
import { EntityRepository, Repository} from 'typeorm';

//Data Mapper pattern
@EntityRepository(Appointment)
class appointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment|null> {
    //   const findAppointment =  this.appointments.find( appointment => isEqual(date,appointment.date));
    //   return findAppointment || null;

    const findAppointment = await this.findOne({
        where: { date }
    })
    return findAppointment || null;
    }
}
export default appointmentsRepository;
