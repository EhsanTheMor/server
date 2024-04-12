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
import { User } from 'src/features/user/entities/User.entity';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Tutorial, (tutorial) => tutorial.season)
  tutorials: Tutorial[];

  @ManyToOne(() => Semester, (semester) => semester.id, {
    onDelete: 'CASCADE',
  })
  semester: Semester;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  createdBy: User;
}
