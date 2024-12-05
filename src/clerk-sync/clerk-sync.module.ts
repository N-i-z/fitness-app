import { Module } from '@nestjs/common';
import { ClerkSyncController } from './clerk-sync.controller';

@Module({
  imports: [],
  controllers: [ClerkSyncController],
  providers: [],
})
export class ClerkSyncModule {}
