import 'reflect-metadata'
import CreateUserService from './CreateUserService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakehashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/User'

describe('CreateUser', () => {
  it('Should create a new user.', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakehashProvider()
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)
    expect(user).toHaveProperty('id')
  })
  it('Should not create a new user with an email already used.', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakehashProvider()
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)

    expect(createUserService.execute({
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    })).rejects.toBeInstanceOf(AppError)
  })
})
