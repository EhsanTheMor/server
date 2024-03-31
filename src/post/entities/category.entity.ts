import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/entities/User.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.createdCategories)
  createdBy: User;

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
