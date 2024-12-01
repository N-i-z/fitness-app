import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ClerkGuard } from 'src/clerk/clerk.guard';

@Controller('tenant/:tenantId/users')
@UseGuards(ClerkGuard)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(`:id`)
  findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }
}