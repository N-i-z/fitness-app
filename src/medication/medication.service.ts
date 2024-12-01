import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    tenantId: string,
    userId: string,
    createMedicationDto: CreateMedicationDto,
  ) {
    const medicationData = {
      ...createMedicationDto,
      date: new Date(createMedicationDto.date),
      tenantId,
      userId,
    };

    return await this.prisma.medicationLog.create({
      data: medicationData,
    });
  }

  async findAll(tenantId: string, userId: string) {
    return await this.prisma.medicationLog.findMany({
      where: { tenantId, userId },
      orderBy: { date: 'desc' },
    });
  }

  async findAllTaken(tenantId: string, userId: string) {
    return await this.prisma.medicationLog.findMany({
      where: {
        tenantId,
        userId,
        taken: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findAllNotTaken(tenantId: string, userId: string) {
    return await this.prisma.medicationLog.findMany({
      where: {
        tenantId,
        userId,
        taken: false,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(tenantId: string, userId: string, id: string) {
    const medication = await this.prisma.medicationLog.findFirst({
      where: {
        id,
        userId,
        tenantId,
      },
    });

    if (!medication) {
      throw new NotFoundException(
        `Medication with ID ${id} not found for user ${userId} in tenant ${tenantId}`,
      );
    }

    return medication;
  }

  async remove(tenantId: string, userId: string, id: string) {
    await this.findOne(tenantId, userId, id);

    return await this.prisma.medicationLog.delete({
      where: {
        id,
      },
    });
  }
}
