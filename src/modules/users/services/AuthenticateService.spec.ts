import 'reflect-metadata'
import CreateUserService from './CreateUserService'
import AuthenticateService from './AuthenticateService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/User'

describe('AthenticateUser', () => {
  it('Should authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const authenticateService = new AuthenticateService(fakeUserRepository)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)

    const userSession = await authenticateService.execute({
      email: userData.email,
      password: userData.password
    })

    expect(userSession).toHaveProperty('token')
  })
  it('Should not authenticate user with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const authenticateService = new AuthenticateService(fakeUserRepository)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)

    expect(authenticateService.execute({
      email: userData.email,
      password: '123'
    })).rejects.toBeInstanceOf(AppError)
  })
  it('Should not authenticate user with wrong email', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const createUserService = new CreateUserService(fakeUserRepository)
    const authenticateService = new AuthenticateService(fakeUserRepository)

    const userData = {
      name: 'Felipe',
      password: '1234567',
      email: 'felipe@'
    }

    const user = await createUserService.execute(userData)

    expect(authenticateService.execute({
      email: '@felipe',
      password: userData.password
    })).rejects.toBeInstanceOf(AppError)
  })
})
