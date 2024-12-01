import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { ClerkGuard } from 'src/clerk/clerk.guard';
import { UserId } from 'src/clerk/user-id.decorator';

@Controller('users/me/meals')
@UseGuards(ClerkGuard)
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Body() createMealDto: CreateMealDto,
  ) {
    return this.mealsService.create(tenantId, userId, createMealDto);
  }

  @Get()
  findAll(@Param(`tenantId`) tenantId: string, @UserId() userId: string) {
    return this.mealsService.findAll(tenantId, userId);
  }

  @Get(':id')
  findOne(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.mealsService.findOne(tenantId, userId, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.mealsService.remove(tenantId, userId, id);
  }
}
