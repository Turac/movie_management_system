import { Ticket } from 'src/ticket/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  password: string; 

  @Column()
  age: number;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: false })
  createdDate: Date;

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets: any;
}
