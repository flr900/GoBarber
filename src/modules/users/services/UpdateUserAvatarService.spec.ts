import 'reflect-metadata'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'

import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import UpdateUserAvartarService from './UpdateUserAvaterService'
import AppError from '@shared/errors/appError'

describe('UpdateAvatar', () => {
  it('Should update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeStorageProvider = new FakeStorageProvider()
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    const updateUserAvartarService = new UpdateUserAvartarService(fakeUserRepository, fakeStorageProvider)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)

    if (!user) { return }
    const responseAvatar = await updateUserAvartarService.execute({ user_id: user.id, avatarFileName: 'AvatarTopzera' })

    expect(responseAvatar.avatar).toBe('AvatarTopzera')
  })
  it('Should not update user avatar without a valid user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const updateUserAvartarService = new UpdateUserAvartarService(fakeUserRepository, fakeStorageProvider)

    const responseAvatar = await

    expect(updateUserAvartarService.execute({ user_id: 'catioro', avatarFileName: 'AvatarTopzera' }))
      .rejects.toBeInstanceOf(AppError)
  })
  it('Should delte previous user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const fakeStorageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    const updateUserAvartarService = new UpdateUserAvartarService(fakeUserRepository, fakeStorageProvider)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)

    if (!user) { return }
    await updateUserAvartarService.execute({ user_id: user.id, avatarFileName: 'AvatarTopzera' })
    const responseAvatar = await updateUserAvartarService.execute({ user_id: user.id, avatarFileName: 'AvatarTopzera2' })

    expect(deleteFile).toHaveBeenCalledWith('AvatarTopzera')
    expect(responseAvatar.avatar).toBe('AvatarTopzera2')
  })
})
