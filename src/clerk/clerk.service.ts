import { Injectable } from '@nestjs/common';
import { clerkClient } from '@clerk/express';

@Injectable()
export class ClerkService {
  async createTenant(ownerId: string, name: string) {
    const organization = await clerkClient.organizations.createOrganization({
      name,
      createdBy: ownerId,
    });
    return organization.id;
  }

  async createUser(name: string, email: string[]) {
    const user = await clerkClient.users.createUser({
      firstName: name,
      emailAddress: email,
    });
    return user.id;
  }
}
