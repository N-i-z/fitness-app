import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClerkModule } from 'src/clerk/clerk.module';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Module({
  imports: [PrismaModule, ClerkModule, HttpModule],
  controllers: [MealsController],
  providers: [MealsService, UserService, TenantService],
})
export class MealsModule {}
