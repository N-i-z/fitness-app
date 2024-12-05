import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MedicationsService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { ClerkGuard } from 'src/clerk/clerk.guard';
import { UserId } from 'src/clerk/user-id.decorator';
import { TenantId } from 'src/clerk/tenant-id.decorator';

@Controller('users/me/medication')
@UseGuards(ClerkGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Body() createMedicationDto: CreateMedicationDto,
  ) {
    return this.medicationsService.create(
      tenantId,
      userId,
      createMedicationDto,
    );
  }

  @Get()
  findAll(@TenantId() tenantId: string, @UserId() userId: string) {
    return this.medicationsService.findAll(tenantId, userId);
  }

  @Get('taken')
  findAllTaken(@TenantId() tenantId: string, @UserId() userId: string) {
    return this.medicationsService.findAllTaken(tenantId, userId);
  }

  @Get('not-taken')
  findAllNotTaken(@TenantId() tenantId: string, @UserId() userId: string) {
    return this.medicationsService.findAllNotTaken(tenantId, userId);
  }

  @Get(':id')
  findOne(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.medicationsService.findOne(tenantId, userId, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.medicationsService.remove(tenantId, userId, id);
  }
}
