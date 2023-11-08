import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  contactNumber: number;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  changedPasswordAt: Date;

  @Column()
  registrationCode: string;
}
