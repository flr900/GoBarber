import { hash } from 'bcryptjs'
import User from '@modules/users/infra/typeorm/entities/User'

import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/appError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}
@injectable()
class CreateUserService {
  constructor (
  @inject('UsersRepository')
  private usersRepository: IUsersRepository) {}

  public async execute ({ name, email, password } :IRequest): Promise< User > {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email adress already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    if (!user) {
      throw new AppError("User doesn't exists")
    }
    return user
  }
}

export default CreateUserService
