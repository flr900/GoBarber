import 'reflect-metadata'
import CreateUserService from './CreateUserService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import path from 'path'
import crypto from 'crypto'
import multer from 'multer'
import UploadConfig from '../../../config/upload'
import fs, { PathLike } from 'fs'
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/appError'
import UpdateUserAvartarService from './UpdateUserAvaterService'

describe('UpdateAvatar', () => {
  it('Should update user avater', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const updateUserAvartarService = new UpdateUserAvartarService(fakeUserRepository)
    const createUserService = new CreateUserService(fakeUserRepository)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)

    if (!user) {
      return 'err'
    }

    const tmpFolder:PathLike = path.resolve(__dirname, '..', '..', '..', '..', 'tmp')
    const fileHash = crypto.randomBytes(10).toString('HEX')
    const filename = `${fileHash}-${'imgtest.jpeg'}`

    const originalFolder: PathLike = path.resolve(__dirname, '..', '..', '..', '..', 'utils')
    const defaultImg:PathLike = path.format({
      root: '/ignored',
      dir: ' /home/felipe/Projects/GoBarber/backend/utils',
      base: 'imgtest.jpeg'
    })
    await fs.promises.copyFile(`${originalFolder}/imgtest.jpeg`, tmpFolder)

    const updatedAvatar = await updateUserAvartarService.execute({
      user_id: user.id,
      avatarFileName: filename
    })

    expect(updatedAvatar.avatar).toBe(filename)
  })
})
