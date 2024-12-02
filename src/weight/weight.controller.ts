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
import { WeightService } from './weight.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UserId } from 'src/clerk/user-id.decorator';
import { ClerkGuard } from 'src/clerk/clerk.guard';
import { TenantGuard } from 'src/clerk/tenant.guard';

@Controller('tenant/:tenantId/users/me/weight')
@UseGuards(ClerkGuard, TenantGuard)
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Body() createWeightDto: CreateWeightDto,
  ) {
    return this.weightService.create(tenantId, userId, createWeightDto);
  }

  @Get()
  findAll(@Param(`tenantId`) tenantId: string, @UserId() userId: string) {
    return this.weightService.findAll(tenantId, userId);
  }

  @Get(':id')
  findOne(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.weightService.findOne(tenantId, userId, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param(`tenantId`) tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.weightService.remove(tenantId, userId, id);
  }
}
