import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Ticket } from 'src/ticket/ticket.entity';

export enum MovieSessionTimeSlot {
  firstSession = '10:00-12:00',
  secondSession = '12:00-14:00',
  thirdSession = '14:00-16:00',
  fourthSession = '16:00-18:00',
  fifthSession = '18:00-20:00',
  sixthSession = '20:00-22:00',
  seventhSession = '22:00-00:00',
}
@Entity()
export class MovieSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: MovieSessionTimeSlot })
  timeSlot: MovieSessionTimeSlot;

  @Column()
  roomNumber: number;

  @ManyToOne(() => Movie, movie => movie.sessions)
  movie: Movie;

  @OneToMany(() => Ticket, ticket => ticket.session)
  ticket: Ticket;
}
