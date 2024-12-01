import {
  Controller,
  Post,
  Get,
  // Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UserId } from 'src/clerk/user-id.decorator';
import { ClerkGuard } from 'src/clerk/clerk.guard';

@Controller('tenant')
@UseGuards(ClerkGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@UserId() userId: string, @Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(userId, createTenantDto);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.tenantService.findAll(userId);
  }

  @Get(':id')
  findOne(@UserId() userId: string, @Param('id') id: string) {
    return this.tenantService.findOne(userId, id);
  }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@UserId() userId: string, @Param('id') id: string) {
  //   return this.tenantService.remove(userId, id);
  // }
}
