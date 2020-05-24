/* eslint-disable camelcase */
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
// eslint-disable-next-line no-unused-vars
import Appointment from '../models/appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface request{
  provider_id: string,
  date: Date
}

class CreateAppointmentService {
  public async execute ({ provider_id, date }: request) : Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInsSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentInsSameDate) {
      throw Error('Appointment already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
