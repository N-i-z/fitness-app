import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '..//user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Injectable()
export class ClerkGuard implements CanActivate {
  constructor(
    private readonly usersService: UserService,
    private readonly tenantService: TenantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.auth?.userId;
    const emailAddress = request.auth?.email;
    const tenantId = request.auth?.tenantId;

    if (!userId || !emailAddress) {
      throw new BadRequestException('Invalid request');
    }

    let user = await this.usersService.findUserById(userId);
    if (!user) {
      user = await this.usersService.createUser({
        name: request.auth?.username,
        email: emailAddress,
      });
      await this.tenantService.create(tenantId, {
        name: 'my organization',
      });
    }
    request.user = user;

    return true;
  }
}
