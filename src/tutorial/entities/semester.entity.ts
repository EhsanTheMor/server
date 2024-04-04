import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Season } from './season.entity';

@Entity()
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Season, (season) => season.semester)
  season: Season[];

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;
}
