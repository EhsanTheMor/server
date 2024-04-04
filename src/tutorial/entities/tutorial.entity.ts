import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Content } from './content.entity';
import { Season } from './season.entity';

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Season, (season) => season.id, {
    onDelete: 'CASCADE',
  })
  season: Season;

  @OneToMany(() => Content, (content) => content.tutorial)
  contents: Content[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  createdBy: User;
}
