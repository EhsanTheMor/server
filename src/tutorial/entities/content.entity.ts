import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Tutorial } from './tutorial.entity';
import { User } from 'src/user/entities/User.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  createdBy: User;

  @ManyToOne(() => Tutorial, (tutorial) => tutorial.id)
  tutorial: Tutorial;
}
