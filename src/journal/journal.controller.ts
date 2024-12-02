import { Controller, Get, UseGuards } from '@nestjs/common';
import { JournalService } from './journal.service';
import { ClerkGuard } from 'src/clerk/clerk.guard';
import { UserId } from 'src/clerk/user-id.decorator';
import { TenantGuard } from 'src/clerk/tenant.guard';

@Controller('tenant/:tenantId/users/me/journal')
@UseGuards(ClerkGuard, TenantGuard)
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  findAll(@UserId() userId: string) {
    return this.journalService.findAll(userId);
  }
}
