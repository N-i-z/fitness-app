import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ClerkModule } from 'src/clerk/clerk.module';
import { UserService } from 'src/user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Module({
  imports: [PrismaModule, ClerkModule],
  controllers: [JournalController],
  providers: [JournalService, UserService, TenantService],
})
export class JournalModule {}
