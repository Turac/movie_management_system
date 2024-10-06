// movie.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  async findAllMovies(): Promise<Movie[]> {
    return this.movieRepository.find({});
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
