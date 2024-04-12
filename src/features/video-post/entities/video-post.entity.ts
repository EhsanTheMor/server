import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VideoPostCategory } from './video-post-category.entity';
import { User } from 'src/features/user/entities/User.entity';

@Entity()
export class VideoPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  videoUrl: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.createdVideoPosts)
  createdBy: User;

  @ManyToOne(
    () => VideoPostCategory,
    (videoPostCategory) => videoPostCategory.videoPosts,
    { onDelete: 'CASCADE' },
  )
  videoPostCategory: VideoPostCategory;
}
