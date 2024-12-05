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
import { TenantId } from 'src/clerk/tenant-id.decorator';

@Controller('users/me/meals')
@UseGuards(ClerkGuard)
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Body() createMealDto: CreateMealDto,
  ) {
    return this.mealsService.createMeal(tenantId, userId, createMealDto);
  }

  @Get()
  findAll(@TenantId() tenantId: string, @UserId() userId: string) {
    return this.mealsService.findAllMealsOfTenantUser(tenantId, userId);
  }

  @Get(':id')
  findOne(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.mealsService.findOneMealOfTenantUser(tenantId, userId, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.mealsService.removeMeal(tenantId, userId, id);
  }
}
