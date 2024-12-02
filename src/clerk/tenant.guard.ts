import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { TenantService } from 'src/tenants/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private readonly tenantService: TenantService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.auth.userId;
    const tenantId = request.params.tenantId;

    if (!tenantId) {
      throw new BadRequestException('401: Invalid request.');
    }

    const hasAccess = await this.tenantService.checkUserAccessToTenant(
      userId,
      tenantId,
    );

    if (!hasAccess) {
      throw new ForbiddenException('403: Forbidden');
    }

    return true;
  }
}
