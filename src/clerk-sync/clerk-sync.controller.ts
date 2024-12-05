import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('webhooks/clerk')
export class ClerkSyncController {
  @Post()
  @HttpCode(HttpStatus.OK)
  webhook(@Body() content: any) {
    // Check signing TODO
    console.log('webhook received', content);
    // TODO: Handle all webhook events
  }
}
