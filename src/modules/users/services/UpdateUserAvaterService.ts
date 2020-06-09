/* eslint-disable camelcase */

import { getRepository } from 'typeorm'
import path from 'path'
import User from '@modules/users/infra/typeorm/entities/User'

import AppError from '@shared/errors/appError'
import uploadConfig from '@config/upload'
import fs from 'fs'

interface Request {
  user_id: string
  avatarFileName: string
}

class UpdateUserAvartarService {
  public async execute ({ user_id, avatarFileName }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

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

    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvartarService
