import 'reflect-metadata'
import CreateUserService from './CreateUserService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/User'

describe('CreateUser', () => {
  it('Should create a new user.', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)

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
    const createUserService = new CreateUserService(fakeUserRepository)

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
