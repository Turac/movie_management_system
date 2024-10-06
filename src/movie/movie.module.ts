import { Module } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieSession } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieSession])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
