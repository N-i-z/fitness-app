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
import { TenantId } from 'src/clerk/tenant-id.decorator';

@Controller('users/me/weight')
@UseGuards(ClerkGuard)
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Body() createWeightDto: CreateWeightDto,
  ) {
    return this.weightService.createWeight(tenantId, userId, createWeightDto);
  }

  @Get()
  findAll(@TenantId() tenantId: string, @UserId() userId: string) {
    return this.weightService.findAllWeightOfTenantUser(tenantId, userId);
  }

  @Get(':id')
  findOne(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.weightService.findOneWeightOfTenantUser(tenantId, userId, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @TenantId() tenantId: string,
    @UserId() userId: string,
    @Param('id') id: string,
  ) {
    return this.weightService.remove(tenantId, userId, id);
  }
}
