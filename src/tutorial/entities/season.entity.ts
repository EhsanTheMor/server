import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Semester } from './semester.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Semester, (semester) => semester.id)
  semester: Semester;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;
}
