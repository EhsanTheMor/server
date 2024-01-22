import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column()
  destination: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
