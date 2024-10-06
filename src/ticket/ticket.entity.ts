import { MovieSession } from 'src/movie/entities/session.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.tickets, { nullable: false })
  user: User;

  @ManyToOne(() => MovieSession, session => session.ticket, { nullable: false })
  session: MovieSession;

  @Column()
  purchaseDate: Date;

  @Column({ default: false, nullable: false })
  watched: boolean;
}
