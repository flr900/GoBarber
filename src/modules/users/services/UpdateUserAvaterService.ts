import path from 'path'
import User from '@modules/users/infra/typeorm/entities/User'

import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/appError'
import uploadConfig from '@config/upload'
import fs from 'fs'
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  user_id: string
  avatarFileName: string
}

@injectable()
class UpdateUserAvartarService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute ({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }
    const filename = await this.storageProvider.saveFile(avatarFileName)

    user.avatar = filename
    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvartarService
