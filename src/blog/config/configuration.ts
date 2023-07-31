import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const environment = process.env.NODE_ENV || 'test';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true
      // envFilePath: `./config/.${environment}.env`,
    }),
  ],
})
export class Configuration {}
