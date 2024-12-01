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
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { ClerkGuard } from 'src/clerk/clerk.guard';
import { UserId } from 'src/clerk/user-id.decorator';

@Controller('tenant/:tenantId/users/me/workout')
@UseGuards(ClerkGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return this.workoutsService.create(tenantId, userId, createWorkoutDto);
  }

  @Get()
  findAll(@Param(`tenantId`) tenantId: string, @UserId() userId: string) {
    return this.workoutsService.findAll(tenantId, userId);
  }

  @Get(':id')
  findOne(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.workoutsService.findOne(tenantId, userId, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.workoutsService.remove(tenantId, userId, id);
  }
}
