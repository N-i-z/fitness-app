import { Module } from '@nestjs/common';
import { WeightController } from './weight.controller';
import { WeightService } from './weight.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClerkModule } from 'src/clerk/clerk.module';
import { UserService } from 'src/user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Module({
  imports: [PrismaModule, ClerkModule],
  controllers: [WeightController],
  providers: [WeightService, UserService, TenantService],
})
export class WeightModule {}
