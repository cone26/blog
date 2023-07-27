import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimeEntity } from '../base-time.entity';
import { Content } from '../post/content.entity';

@Entity('category')
export class Category extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Content, (content) => content.category)
  contents: Content[];

  constructor(partial?: Partial<Category>) {
    super();
    Object.assign(this, partial);
  }
}
