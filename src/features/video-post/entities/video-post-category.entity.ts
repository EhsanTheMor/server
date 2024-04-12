import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoPost } from './video-post.entity';
import { User } from 'src/features/user/entities/User.entity';

@Entity()
export class VideoPostCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => VideoPost, (videoPost) => videoPost.videoPostCategory)
  videoPosts: VideoPost[];

  @ManyToOne(() => User, (user) => user.createdVideoPostCategories)
  createdBy: User;
}
