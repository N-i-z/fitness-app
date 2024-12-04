import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Role } from 'src/roles/role.enum';
import { CreateTenantDto } from 'src/tenants/dto/create-tenant.dto';
import { CreateDBUserDto } from 'src/user/dto/create-db-user-dto';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async createUser(id: string, createDBUserDto: CreateDBUserDto) {
    return this.user.create({
      data: {
        ...createDBUserDto,
        id,
      },
    });
  }
  async createTenant(
    tenantId: string,
    userId: string,
    createTenantDto: CreateTenantDto,
  ) {
    return this.$transaction(async (prisma) => {
      const tenant = await prisma.tenant.create({
        data: {
          id: tenantId,
          name: createTenantDto.name,
          createdAt: new Date(),
        },
      });

      await prisma.usersOfTenants.create({
        data: {
          tenantId: tenant.id,
          userId,
          role: 'Admin',
        },
      });

      return tenant;
    });
  }
}
