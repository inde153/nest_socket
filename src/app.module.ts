import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// nest.js 프로젝트가 실행될 때, env file을 읽는 작업은 비동기로 실행됩니다.
// 프로젝트는 비동기 함수가 끝나는 것을 기다리지 않고 nest 프로젝트를 모두 읽어버리기 때문에 이런 현상이 발생합니다.

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
