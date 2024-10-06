// movie.controller.ts
import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './movie.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @Roles(UserRole.managaer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAllMovies() {
    return this.movieService.findAllMovies();
  }

  @Patch(':id')
  @Roles(UserRole.managaer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(UserRole.managaer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteMovie(@Param('id') id: number) {
    return this.movieService.deleteMovie(id);
  }
}
