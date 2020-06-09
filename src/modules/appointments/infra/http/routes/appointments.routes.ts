/* eslint-disable camelcase */
import { Router } from 'express'
import AppointmentsController from '../controllers/AppointmentsController'
import ensureAthenticated from '@modules/users/infra/http/middleware/ensureAthenticated'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAthenticated)

appointmentsRouter.post('/', appointmentsController.create)

/* appointmentsRouter.get('/', async (request, response) => {
  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
}) */

export default appointmentsRouter
