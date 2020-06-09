import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'
import ICreateAppointmentDTO from '../dtos/iCreateAppointmentDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date:Date): Promise<Appointment|undefined>
}
