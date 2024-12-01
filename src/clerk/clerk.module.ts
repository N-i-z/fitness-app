import { Module } from '@nestjs/common';
import { ClerkService } from './clerk.service';
import { ClerkGuard } from './clerk.guard';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantService } from 'src/tenants/tenant.service';

@Module({
  providers: [
    ClerkService,
    ClerkGuard,
    UserService,
    TenantService,
    PrismaService,
  ],
  exports: [ClerkService, ClerkGuard],
})
export class ClerkModule {}
