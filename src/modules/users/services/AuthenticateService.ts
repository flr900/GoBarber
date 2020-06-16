import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import User from '@modules/users/infra/typeorm/entities/User'
import authConfig from '@config/auth'
import AppError from '@shared/errors/appError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest{
  email:string,
  password:string
}

interface IResponse{
  user: User,
  token: string
}
@injectable()
class AuthenticateUserService {
  constructor (
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,
  @inject('HashProvider')
  private hashProvider:IHashProvider
  ) {}

  public async execute ({ email, password }:IRequest) : Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }
    const passwordMatched = await this.hashProvider.compareHash(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secretKey, expiresIn } = authConfig.jwt

    const token = sign({ }, secretKey, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService
