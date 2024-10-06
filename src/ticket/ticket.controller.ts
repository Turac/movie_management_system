import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { BuyTicketDto as buyTicketDto } from './ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UserRole } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles, JwtUserPayload } from 'src/utils/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('ticket')
@ApiBearerAuth()
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('buy')
  @ApiOperation({ summary: 'Create/buy ticket, usage restriction: customer' })
  @ApiResponse({
    status: 200,
    description: 'Successfully bought ticket',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async buyTicket(
    @Body() buyTicket: buyTicketDto,
    @Req() req: { user: JwtUserPayload },
  ) {
    const userId = req.user['userId'];
    return this.ticketService.createTicket(userId, buyTicket);
  }

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get/see ticket by id, usage restriction: customer',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully get ticket',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async getTicket(@Param('id') id: number) {
    return this.ticketService.getTicketById(id);
  }

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('watch/:id')
  @ApiOperation({
    summary: 'Watch movie/consume ticket usage restriction: customer',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully used ticket',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async watchTicket(
    @Param('id') id: number,
    @Req() req: { user: JwtUserPayload },
  ) {
    const userId = req.user['userId'];
    return this.ticketService.watchTicketById(id, userId);
  }

  @Roles(UserRole.customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  @ApiOperation({ summary: 'List your watch history' })
  @ApiResponse({
    status: 200,
    description: 'Successfully listed',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  async getWatchList(@Req() req: { user: JwtUserPayload }) {
    const userId = req.user['userId'];
    return this.ticketService.getWatchHistory(userId);
  }
}
