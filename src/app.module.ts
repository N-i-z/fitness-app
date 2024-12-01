import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TenantsModule } from './tenants/tenant.module';
import { PrismaModule } from './prisma/prisma.module';
// import { DatabaseModule } from './database/database.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { MealsModule } from './meals/meals.module';
import { WeightModule } from './weight/weight.module';
import { MedicationsModule } from './medication/medication.module';
import { JournalModule } from './journal/journal.module';
import { ClerkMiddleware } from './clerk/clerk.middleware';
import { ConfigModule } from '@nestjs/config';
import { ClerkModule } from './clerk/clerk.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClerkModule,
    JournalModule,
    TenantsModule,
    PrismaModule,
    // DatabaseModule,
    WorkoutsModule,
    MealsModule,
    WeightModule,
    MedicationsModule,
  ],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClerkMiddleware).forRoutes('/');
  }
}
