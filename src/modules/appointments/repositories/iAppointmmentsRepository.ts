import Appointment from '@modules/appointments/infra/typeorm/entities/appointment'

export default interface IAppointmentsRepository {
  findByDate(date:Date): Promise<Appointment|undefined>
}
