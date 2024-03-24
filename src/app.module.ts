import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventsModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
