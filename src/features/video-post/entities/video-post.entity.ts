import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VideoPostCategory } from './video-post-category.entity';

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

  @ManyToOne(
    () => VideoPostCategory,
    (videoPostCategory) => videoPostCategory.videoPosts,
  )
  category: VideoPostCategory;
}
