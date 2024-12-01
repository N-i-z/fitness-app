import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWeightDto } from './dto/create-weight.dto';

@Injectable()
export class WeightService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tenantId: string,
    userId: string,
    createWeightDto: CreateWeightDto,
  ) {
    const weightData = {
      ...createWeightDto,
      date: new Date(createWeightDto.date),
      tenantId,
      userId,
    };

    return await this.prisma.weightLog.create({
      data: weightData,
    });
  }

  async findAll(tenantId: string, userId: string) {
    return await this.prisma.weightLog.findMany({
      where: { tenantId, userId },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(tenantId: string, userId: string, id: string) {
    const weightLog = await this.prisma.weightLog.findFirst({
      where: {
        id,
        userId,
        tenantId,
      },
    });

    if (!weightLog) {
      throw new NotFoundException(
        `Weight log with ID ${id} not found for user ${userId} in tenant ${tenantId}`,
      );
    }

    return weightLog;
  }

  async remove(tenantId: string, userId: string, id: string) {
    await this.findOne(tenantId, userId, id);

    return await this.prisma.weightLog.delete({
      where: { id },
    });
  }
}
