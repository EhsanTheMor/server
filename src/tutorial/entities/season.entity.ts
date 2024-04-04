import { User } from 'src/user/entities/User.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Semester } from './semester.entity';
import { Tutorial } from './tutorial.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Tutorial, (tutorial) => tutorial.id)
  tutorials: Tutorial[];

  @ManyToOne(() => Semester, (semester) => semester.id)
  semester: Semester;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;
}
