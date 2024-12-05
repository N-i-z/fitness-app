import { Injectable } from '@nestjs/common';
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

  async createTenant(userId: string, createTenantDto: CreateTenantDto) {
    const tenantId = await this.clerkService.createTenant(
      userId,
      createTenantDto.name,
    );

    return await this.createDBTenant(userId, tenantId, createTenantDto);
  }

  async createDBTenant(
    userId: string,
    tenantId: string,
    createTenantDto: CreateTenantDto,
  ) {
    const tenantData = {
      ...createTenantDto,
      createdAt: new Date(),
      id: tenantId,
    };

    await this.prisma.tenant.create({
      data: tenantData,
    });

    await this.addUserToTenant(userId, tenantId, Role.Admin);

    return this.findTenantById(tenantId);
  }

  async findAllTenantsOfUser(userId: string) {
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

  async findUsersTenant(userId: string, id: string) {
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
    return tenant;
  }

  async findTenantById(id: string) {
    return await this.prisma.tenant.findUnique({
      where: {
        id,
      },
    });
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

  async addUserToTenant(userId: string, tenantId: string, role: Role) {
    const userOfTenant = await this.prisma.usersOfTenants.create({
      data: {
        userId,
        tenantId,
        role,
      },
    });
    return userOfTenant;
  }

  async remove(userId: string, id: string) {
    await this.findUsersTenant(userId, id);

    return await this.prisma.tenant.delete({
      where: { id },
    });
  }
}
