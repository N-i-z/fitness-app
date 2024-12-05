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
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UserId } from 'src/clerk/user-id.decorator';
import { ClerkGuard } from 'src/clerk/clerk.guard';
import { TenantId } from 'src/clerk/tenant-id.decorator';
import { RoleDecorator } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('tenant')
@UseGuards(ClerkGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@UserId() userId: string, @Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.createTenant(userId, createTenantDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createDBTenant(
    @UserId() UserId: string,
    @TenantId() id: string,
    @RoleDecorator() role: Role,
    @Body() createTenantDto: CreateTenantDto,
  ) {
    const tenant = this.tenantService.createDBTenant(
      id,
      UserId,
      createTenantDto,
    );
    const usersOfTenants = this.tenantService.addUserToTenant(id, UserId, role);
    return { tenant, usersOfTenants };
  }
  @Get()
  findAll(@UserId() userId: string) {
    return this.tenantService.findAllTenantsOfUser(userId);
  }

  @Get(':id')
  findOne(@UserId() userId: string, @Param('id') id: string) {
    return this.tenantService.findUsersTenant(userId, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@UserId() userId: string, @Param('id') id: string) {
    return this.tenantService.remove(userId, id);
  }
}
