import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';

@Entity('post')
export class PostEntity extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  category: string;

  constructor(partial?: Partial<PostEntity>) {
    super();
    Object.assign(this, partial);
  }
}
