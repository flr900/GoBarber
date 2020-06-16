import 'reflect-metadata'
import CreateUserService from './CreateUserService'
import AuthenticateService from './AuthenticateService'
import FakeUserRepository from '../repositories/fakes/FakeUserRepository'
import FakehashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/appError'
import User from '../infra/typeorm/entities/User'

describe('AthenticateUser', () => {
  it('Should authenticate user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakehashProvider()

    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    const authenticateService = new AuthenticateService(fakeUserRepository, fakeHashProvider)

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
    expect(userSession.user).toEqual(user)
  })
  it('Should not authenticate non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakehashProvider()
    const authenticateService = new AuthenticateService(fakeUserRepository, fakeHashProvider)

    expect(authenticateService.execute({
      email: 'fulaninho',
      password: 'a tal da password'
    })).rejects.toBeInstanceOf(AppError)
  })
  it('Should not authenticate user with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakehashProvider()
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    const authenticateService = new AuthenticateService(fakeUserRepository, fakeHashProvider)

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
    const fakeHashProvider = new FakehashProvider()
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider)
    const authenticateService = new AuthenticateService(fakeUserRepository, fakeHashProvider)

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
