import path from 'path'
import User from '@modules/users/infra/typeorm/entities/User'

import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/appError'
import uploadConfig from '@config/upload'
import fs from 'fs'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  user_id: string
  avatarFileName: string
}

@injectable()
class UpdateUserAvartarService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async execute ({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    user.avatar = avatarFileName

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvartarService
