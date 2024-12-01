import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClerkModule } from 'src/clerk/clerk.module';
import { UserService } from 'src/user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Module({
  imports: [PrismaModule, ClerkModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService, UserService, TenantService],
})
export class WorkoutsModule {}
