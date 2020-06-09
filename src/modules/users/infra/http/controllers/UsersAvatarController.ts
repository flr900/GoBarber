import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateUserAvartarService from '@modules/users/services/UpdateUserAvaterService'

export default class UsersAvatarController {
  public async update (request:Request, response: Response): Promise<Response> {
    const avatarFileName = request.file.filename
    const user_id = request.User.id

    const updateUserAvatar = container.resolve(UpdateUserAvartarService)

    const user = await updateUserAvatar.execute({
      user_id,
      avatarFileName
    })
    delete user.password
    return response.json(user)
  }
}
