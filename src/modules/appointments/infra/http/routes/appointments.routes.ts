/* eslint-disable camelcase */
import { Router } from 'express'

import { parseISO } from 'date-fns'
import { container } from 'tsyringe'
import CreateAppointmentService from '../../../services/CreateAppointmentService'

import ensureAthenticated from '@modules/users/infra/http/middleware/ensureAthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAthenticated)

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body
  const parsedDate = parseISO(date)

  const createAppointement = container.resolve(CreateAppointmentService)

  const appointment = await createAppointement.execute({ provider_id, date: parsedDate })

  return response.json(appointment)
})

/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
}) */

export default appointmentsRouter
