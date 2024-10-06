import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  customer = 'customer',
  managaer = 'manager',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; //TODO: Make password secret - add hash

  @Column()
  age: number;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: false })
  createdDate: Date;
}
