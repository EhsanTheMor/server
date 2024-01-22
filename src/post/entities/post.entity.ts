import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  createdAt: Date;

  @Column()
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  modifiedAt: Date;

  @Column({ nullable: true })
  modifiedBy: string;

  @ManyToOne(() => Category, (category) => category.posts)
  category: Category;
}
