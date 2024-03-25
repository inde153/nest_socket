import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);
  // CORS 설정
  const corsOptions: CorsOptions = {
    origin: '*', // 허용할 오리진
    methods: '*', // 허용할 메서드
    allowedHeaders: 'Content-Type, Authorization', // 허용할 헤더
    credentials: true, // 쿠키 및 인증 헤더 허용 여부
    maxAge: 81600,
  };

  app.enableCors(corsOptions);
  //소켓 어뎁터로 연결 합니다.
  app.useWebSocketAdapter(new IoAdapter(app));

  // 서버 포트 세팅
  await app.listen(PORT);
}

bootstrap();
