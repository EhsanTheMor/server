import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  category: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  modifiedAt: Date;

  @Column({ nullable: true })
  modifiedBy: string;
}
