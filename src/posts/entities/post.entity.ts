import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'

@Entity()
export class Post{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postName: string;

  @Column()
  category: string;

  @Column()
  imageURL: string;

  @Column()
  createAt: Date;

  @Column()
  modifiedAt: Date;

  @Column()
  description: string;

  @Column()
  title: string;
}
