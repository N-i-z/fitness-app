import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { clerkClient } from '@clerk/express';
import { UserService } from 'src/user/user.service';
import { TenantService } from 'src/tenants/tenant.service';

@Injectable()
export class ClerkGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tenantService: TenantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.auth?.userId;
    const tenantId = request.auth?.orgId;
    const userTenantRole = request.auth?.orgRole;

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
          name: user.username,
          email: [emailAddress],
        });
      }

      let existingTenant;
      if (!tenantId) {
        // Personal account
        existingTenant = await this.tenantService.findTenantById(userId);
        if (!existingTenant) {
          existingTenant = await this.tenantService.createDBTenant(
            userId,
            userId,
            { name: 'My Organization' },
          );
        }
      } else {
        // Organization
        existingTenant = await this.tenantService.findTenantById(tenantId);
        if (!existingTenant) {
          const organization = await clerkClient.organizations.getOrganization({
            organizationId: tenantId,
          });
          existingTenant = await this.tenantService.createDBTenant(
            userId,
            tenantId,
            { name: organization.name },
          );
        } else {
          // Check if the user is already a member of the organization
          const userIsMember = await this.tenantService.checkUserAccessToTenant(
            userId,
            tenantId,
          );
          if (!userIsMember) {
            await this.tenantService.addUserToTenant(
              userId,
              tenantId,
              userTenantRole,
            );
          }
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
