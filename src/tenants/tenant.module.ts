import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { PrismaModule } from '../prisma/prisma.module';
import { TenantController } from './tenant.controller';
import { ClerkService } from 'src/clerk/clerk.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [TenantController],
  providers: [TenantService, ClerkService, UserService],
})
export class TenantsModule {}
