import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseTimeEntity } from '../base-time.entity'

@Entity('post')
export class Post extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  content: string
}
