import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkout(
    tenantId: string,
    userId: string,
    createWorkoutDto: CreateWorkoutDto,
  ) {
    const workoutData = {
      ...createWorkoutDto,
      date: new Date(createWorkoutDto.date),
      tenantId,
      userId,
    };

    return await this.prisma.workout.create({
      data: workoutData,
    });
  }

  async findAllWorkoutsOfTenantUser(tenantId: string, userId: string) {
    return await this.prisma.workout.findMany({
      where: { tenantId, userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOneWorkoutOfTenantUser(
    tenantId: string,
    userId: string,
    id: string,
  ) {
    const workout = await this.prisma.workout.findFirst({
      where: {
        id,
        userId,
        tenantId,
      },
    });

    if (!workout) {
      throw new NotFoundException(
        `Workout with ID ${id} not found for user ${userId} in tenant ${tenantId}`,
      );
    }

    return workout;
  }

  async remove(tenantId: string, userId: string, id: string) {
    await this.findOneWorkoutOfTenantUser(tenantId, userId, id);

    return await this.prisma.workout.delete({
      where: {
        id,
      },
    });
  }
}
