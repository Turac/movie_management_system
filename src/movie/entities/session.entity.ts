import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Ticket } from 'src/ticket/ticket.entity';
import { MovieSessionTimeSlot } from 'src/utils/enums';

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

  @Column({ nullable: true })
  deletedAt: Date;
}
