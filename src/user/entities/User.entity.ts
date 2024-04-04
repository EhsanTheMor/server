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
import { Semester } from 'src/tutorial/entities/semester.entity';
import { Season } from 'src/tutorial/entities/season.entity';
import { Tutorial } from 'src/tutorial/entities/tutorial.entity';
import { Content } from 'src/tutorial/entities/content.entity';

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

  @OneToMany(() => Content, (content) => content.createdBy)
  createdContents: Content[];

  @OneToMany(() => Tutorial, (tutorial) => tutorial.createdBy)
  createdTutorials: Tutorial[];

  @OneToMany(() => Semester, (semester) => semester.createdBy)
  createdSemesters: Semester[];

  @OneToMany(() => Season, (season) => season.createdBy)
  createdSeasons: Season[];

  @OneToMany(() => Category, (category) => category.createdBy)
  createdCategories: Category[];

  @OneToMany(() => Post, (post) => post.createdBy)
  posts: Post[];

  @ManyToMany(() => Category, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  AccessedCategories: Category[];
}
