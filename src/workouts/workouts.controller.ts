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
import { TenantId } from 'src/clerk/tenant-id.decorator';

@Controller('users/me/workout')
@UseGuards(ClerkGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return this.workoutsService.createWorkout(
      tenantId,
      userId,
      createWorkoutDto,
    );
  }

  @Get()
  findAll(@TenantId() tenantId: string, @UserId() userId: string) {
    return this.workoutsService.findAllWorkoutsOfTenantUser(tenantId, userId);
  }

  @Get(':id')
  findOne(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.workoutsService.findOneWorkoutOfTenantUser(
      tenantId,
      userId,
      id,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.workoutsService.remove(tenantId, userId, id);
  }
}
