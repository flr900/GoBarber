/* eslint-disable camelcase */
import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import ensureAuthenticated from '../middleware/ensureAthenticated'
import CreateUserService from '../services/CreateUserService'
import UpdateUserAvartarService from '../services/UpdateUserAvaterService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password

    response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const avatarFileName = request.file.filename
  const user_id = request.User.id

  const updateUserAvatar = new UpdateUserAvartarService()

  const user = await updateUserAvatar.execute({
    user_id,
    avatarFileName
  })
  delete user.password
  return response.json(user)
})

export default usersRouter
