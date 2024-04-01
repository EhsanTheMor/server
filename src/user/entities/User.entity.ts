import { Category } from 'src/post/entities/category.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TROLES } from '../constants/roles.constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  role: TROLES;

  @Column()
  password: string;

  @Column({ nullable: true })
  passwordChangedAt: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => Category, (category) => category.createdBy)
  createdCategories: Category[];

  @OneToMany(() => Post, (post) => post.createdBy)
  posts: Post[];

  @ManyToMany(() => Category)
  @JoinTable()
  AccessedCategories: Category[];
}
