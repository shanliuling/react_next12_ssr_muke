import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'
// 装饰器的写法
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id!: number
  @Column()
  nickname!: string
  @Column()
  job!: string
  @Column()
  avatar!: string
  @Column()
  introduce!: string
}
