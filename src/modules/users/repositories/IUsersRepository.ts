import User from '../infra/typeorm/entities/User'
import ICreateUserDTO from '../dtos/iCreateUserDTO'

export default interface IUsersRepository {
  findById(id:string): Promise<User|undefined>
  findByEmail(email:string): Promise<User|undefined>
  create(data: ICreateUserDTO) : Promise<User|undefined>
  save(user:User): Promise<User>
}
