import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tutorial } from './tutorial.entity';
import { User } from 'src/user/entities/User.entity';

export enum ContentTypes {
  HeaderOne,
  HeaderTwo,
  Paragraph,
  Quote,
  Image,
  Video,
}

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  type: ContentTypes;

  @Column()
  displayOrder: number;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @ManyToOne(() => Tutorial, (tutorial) => tutorial.id)
  tutorial: Tutorial;
}
