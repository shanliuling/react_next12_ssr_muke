import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { User } from './user'
// 装饰器的写法
@Entity({ name: 'user_auths' })
export class UserAuths extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number
  @Column()
  identity_type!: string
  @Column()
  identifier!: string
  @Column()
  credential!: string   

  @ManyToOne(() => User, {
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user!: User
}
