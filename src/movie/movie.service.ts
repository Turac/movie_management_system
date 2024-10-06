// movie.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './movie.dto';
import { MovieSession } from './entities/session.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieSession)
    private readonly movieSessionRepository: Repository<MovieSession>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    this.movieRepository.save(movie);
    const session = this.movieSessionRepository.create(createMovieDto.sessions);
    session.map(currentSession => {
      currentSession.movie = movie;
    });
    this.movieSessionRepository.save(session);
    return movie;
  }

  async findAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['sessions'] });
  }

  async updateMovie(
    id: number,
    updateMovieDto: Partial<Movie>,
  ): Promise<Movie> {
    await this.movieRepository.update(id, updateMovieDto);
    return this.movieRepository.findOne({
      where: { id },
    });
  }

  async deleteMovie(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
