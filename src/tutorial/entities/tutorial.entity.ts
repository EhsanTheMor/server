import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Content, (content) => content.tutorial)
  contents: Content[];

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;
}
