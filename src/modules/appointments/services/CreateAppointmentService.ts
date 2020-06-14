
import { startOfHour } from 'date-fns'
import Appointment from '../infra/typeorm/entities/appointment'

import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/appError'
import IAppointmentsRepository from '../repositories/IAppointmmentsRepository'

interface IRequest{
  provider_id: string,
  date: Date
}
@injectable()
class CreateAppointmentService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) {}

  public async execute ({ provider_id, date }: IRequest) : Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInsSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInsSameDate) {
      throw new AppError('Appointment already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })
    return appointment
  }
}

export default CreateAppointmentService
