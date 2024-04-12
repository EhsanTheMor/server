import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TROLES } from '../constants/roles.constants';
import { Content } from 'src/features/tutorial/entities/content.entity';
import { Tutorial } from 'src/features/tutorial/entities/tutorial.entity';
import { Semester } from 'src/features/tutorial/entities/semester.entity';
import { Season } from 'src/features/tutorial/entities/season.entity';
import { Category } from 'src/features/post/entities/category.entity';
import { Post } from 'src/features/post/entities/post.entity';
import { VideoPostCategory } from 'src/features/video-post/entities/video-post-category.entity';
import { VideoPost } from 'src/features/video-post/entities/video-post.entity';

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

  @OneToMany(() => VideoPostCategory, (category) => category.createdBy)
  createdVideoPostCategories: VideoPostCategory[];

  @OneToMany(() => VideoPost, (videoPost) => videoPost.createdBy)
  createdVideoPosts: VideoPost[];

  @OneToMany(() => Post, (post) => post.createdBy)
  posts: Post[];

  @ManyToMany(() => Category, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  AccessedCategories: Category[];
}
