import { Injectable, NestMiddleware } from '@nestjs/common';
import { clerkMiddleware } from '@clerk/express';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: () => void) {
    clerkMiddleware({
      publishableKey: this.configService.getOrThrow(
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      ),
    })(req, res, next);
  }
}
