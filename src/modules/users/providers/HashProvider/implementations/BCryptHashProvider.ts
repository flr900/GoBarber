import IHashProvider from '../models/IHashProvider'
import { hash, compare } from 'bcryptjs'

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash (payload: string): Promise<string> {
    return await hash(payload, 8)
  }

  public async compareHash (payload: string, hashed: string) : Promise<boolean> {
    return await compare(payload, hashed)
  }
}
