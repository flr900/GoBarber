import User from '../../infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/iCreateUserDTO'
import { uuid } from 'uuidv4'

class UsersRepository implements IUsersRepository {
  private users: User[]= []
  public async findByEmail (email:string) : Promise<User | undefined> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  public async findById (id:string) : Promise<User | undefined> {
    const user = this.users.find(user => user.id === id)
    return user
  }

  public async create ({ name, password, email }: ICreateUserDTO) : Promise<User> {
    const user = new User()
    Object.assign(user, { id: uuid(), name, password, email })
    this.users.push(user)
    return user
  }

  public async save (user:User): Promise<User> {
    this.users.push(user)
    return user
  }
}

export default UsersRepository
