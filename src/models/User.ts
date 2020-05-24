/* eslint-disable camelcase */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')

class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @UpdateDateColumn()
  updated_at:Date

  @CreateDateColumn()
  created_at:Date
}

export default User
