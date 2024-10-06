import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MovieSession } from './session.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ageRestriction: number;

  @OneToMany(() => MovieSession, session => session.movie)
  sessions: MovieSession[];

  @Column({ nullable: true })
  deletedAt: Date;
}
