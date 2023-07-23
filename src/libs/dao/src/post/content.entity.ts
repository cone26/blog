import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Category } from '../category/category.entity';

@Entity('content')
export class Content extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => Category, (category) => category.contents)
  category: Category;

  constructor(partial?: Partial<Content>) {
    super();
    Object.assign(this, partial);
  }
}
