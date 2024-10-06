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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UserRole } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('movie')
@ApiBearerAuth()
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @Roles(UserRole.managaer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create movie, usage restriction: managers' })
  @ApiResponse({
    status: 201,
    description: 'Successfully created movie',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List movies, usage restriction: all users' })
  @ApiResponse({
    status: 201,
    description: 'Successfully get movie list',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  findAllMovies() {
    return this.movieService.findAllMovies();
  }

  @Patch(':id')
  @Roles(UserRole.managaer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update movies, usage restriction: managers' })
  @ApiResponse({
    status: 200,
    description: 'Successfully update movie ',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @Roles(UserRole.managaer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete movie by id, usage restriction: managers' })
  @ApiResponse({
    status: 200,
    description: 'Successfully delete movie',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  deleteMovie(@Param('id') id: number) {
    return this.movieService.softDeleteMovie(id);
  }
}
