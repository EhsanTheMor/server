import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Season } from './season.entity';
import { User } from 'src/features/user/entities/User.entity';

@Entity()
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Season, (season) => season.semester)
  season: Season[];

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  createdBy: User;
}
