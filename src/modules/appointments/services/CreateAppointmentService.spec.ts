import 'reflect-metadata'
import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/appError'

describe('CreateAppointment', () => {
  it('shoulde be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234565'
    })
    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('1234565')
  })

  it("shouldn't be able to create two appointments in same time", async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

    const date = new Date(2020, 4, 10, 11)
    await createAppointment.execute({
      date,
      provider_id: '1234565'
    })

    expect(createAppointment.execute({
      date,
      provider_id: '1234565'
    })).rejects.toBeInstanceOf(AppError)
  })
})
