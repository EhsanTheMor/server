import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VideoPost } from './video-post.entity';

@Entity()
export class VideoPostCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => VideoPost, (videoPost) => videoPost.category)
  videoPosts: VideoPost[];
}
