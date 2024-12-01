import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ClerkService } from 'src/clerk/clerk.service';

@Injectable()
export class TenantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerkService: ClerkService,
  ) {}

  async create(userId: string, createTenantDto: CreateTenantDto) {
    const tenantId = await this.clerkService.createTenant(
      userId,
      createTenantDto.name,
    );
    const tenantData = {
      ...createTenantDto,
      date: new Date(),
      userId,
      id: tenantId,
    };

    return await this.prisma.tenant.create({
      data: tenantData,
    });
  }

  async findAll(userId: string) {
    return await this.prisma.tenant.findMany({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
    });
  }

  async findOne(userId: string, id: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: {
        id,
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
    });

    if (!tenant) {
      throw new NotFoundException(
        `Tenant log with ID ${id} not found for user ${userId}`,
      );
    }

    return tenant;
  }

  // async remove(userId: string, id: string) {
  //   await this.findOne(userId, id);

  //   return await this.prisma.tenant.delete({
  //     where: { id, userId },
  //   });
  // }
}
