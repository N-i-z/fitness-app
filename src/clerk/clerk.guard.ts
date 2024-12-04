import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ClerkService } from 'src/clerk/clerk.service';
import { clerkClient } from '@clerk/express';
import { UserService } from 'src/user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Injectable()
export class ClerkGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
    private readonly clerkService: ClerkService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.auth?.userId;
    const tenantId = request.auth?.tenantId;

    if (!userId) {
      throw new BadRequestException('User ID is missing');
    }

    try {
      const user = await clerkClient.users.getUser(userId);

      if (!user) {
        throw new BadRequestException('User not found in Clerk');
      }

      const emailAddress = user.emailAddresses?.[0]?.emailAddress;

      if (!emailAddress) {
        throw new BadRequestException('User email not found');
      }

      let existingUser = await this.userService.findUserById(userId);

      if (!existingUser) {
        existingUser = await this.userService.createDBUser(userId, {
          name: request.auth?.username || 'anonymous',
          email: [emailAddress],
        });

        if (tenantId) {
          await this.tenantService.createDBTenant(userId, tenantId, {
            name: 'My Organization',
          });
        } else {
          throw new BadRequestException('Tenant ID is missing');
        }
      }

      request.user = existingUser;
      return true;
    } catch (error) {
      console.error('Error processing Clerk user:', error);
      throw new BadRequestException(
        'Invalid request: ' + error.message || 'Unknown error',
      );
    }
  }
}
