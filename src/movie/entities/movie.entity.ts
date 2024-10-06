import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ageRestriction: number;

  @Column('json')
  sessions: string[];
}

export class Session {
  date: string;
  timeSlot: string;
  roomNumber: number;
}
