import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

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

  // it("shouldn't be able to create two appointments in same time", () => {
  //  expect(1 + 2).toBe(3)
  // })
})
