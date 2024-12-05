import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async createMedication(
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

  async findAllMedicationOfTenantUser(tenantId: string, userId: string) {
    return await this.prisma.medicationLog.findMany({
      where: { tenantId, userId },
      orderBy: { date: 'desc' },
    });
  }

  async findAllMedicationTakenOfTenantUser(tenantId: string, userId: string) {
    return await this.prisma.medicationLog.findMany({
      where: {
        tenantId,
        userId,
        taken: true,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findAllMedicationNotTakenOfTenantUser(
    tenantId: string,
    userId: string,
  ) {
    return await this.prisma.medicationLog.findMany({
      where: {
        tenantId,
        userId,
        taken: false,
      },
      orderBy: { date: 'desc' },
    });
  }

  async findOneMedicationOfTenantUser(
    tenantId: string,
    userId: string,
    id: string,
  ) {
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

  async removeMedication(tenantId: string, userId: string, id: string) {
    await this.findOneMedicationOfTenantUser(tenantId, userId, id);

    return await this.prisma.medicationLog.delete({
      where: {
        id,
      },
    });
  }
}
