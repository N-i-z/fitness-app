import { Module } from '@nestjs/common';
import { MedicationsController } from './medication.controller';
import { MedicationsService } from './medication.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClerkModule } from 'src/clerk/clerk.module';
import { UserService } from 'src/user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Module({
  imports: [PrismaModule, ClerkModule],
  controllers: [MedicationsController],
  providers: [MedicationsService, UserService, TenantService],
})
export class MedicationsModule {}
