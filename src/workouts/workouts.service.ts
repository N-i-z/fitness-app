import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
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

  async findAll(tenantId: string, userId: string) {
    return await this.prisma.workout.findMany({
      where: { tenantId, userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(tenantId: string, userId: string, id: string) {
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
    await this.findOne(tenantId, userId, id);

    return await this.prisma.workout.delete({
      where: {
        id,
      },
    });
  }
}
