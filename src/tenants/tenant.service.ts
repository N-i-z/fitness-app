import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ClerkService } from 'src/clerk/clerk.service';
import { Role } from 'src/roles/role.enum';

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

  async createDBTenant(
    userId: string,
    tenantId: string,
    createTenantDto: CreateTenantDto,
  ) {
    const tenantData = {
      ...createTenantDto,
      createdAt: new Date(),
      userId,
      id: tenantId,
    };

    await this.prisma.tenant.create({
      data: tenantData,
    });

    return await this.prisma.usersOfTenants.create({
      data: {
        userId,
        tenantId,
        role: 'Admin',
      },
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

    // if (!tenant) {
    //   throw new NotFoundException(
    //     `Tenant log with ID ${id} not found for user ${userId}`,
    //   );
    // }

    return tenant;
  }

  async checkUserAccessToTenant(userId: string, id: string): Promise<boolean> {
    const tenant = await this.prisma.tenant.findFirst({
      where: {
        id,
        users: {
          some: {
            userId,
          },
        },
      },
    });
    return !!tenant;
  }

  async addToUsersOfTenants(userId: string, tenantId: string, role: Role) {
    const usersoftenants = await this.prisma.usersOfTenants.create({
      data: {
        userId,
        tenantId,
        role,
      },
    });
    return usersoftenants;
  }

  // async remove(userId: string, id: string) {
  //   await this.findOne(userId, id);

  //   return await this.prisma.tenant.delete({
  //     where: { id, userId },
  //   });
  // }
}
