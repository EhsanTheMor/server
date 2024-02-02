import { Category } from 'src/post/entities/category.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  passwordChangedAt: Date;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToMany(() => Category)
  @JoinTable()
  AccessedCategories: Category[];
}
