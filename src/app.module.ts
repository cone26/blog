import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from './blog/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { defaultTypeOrmOptions } from './libs/common/src/database/typeorm/typeorm-module.options';

@Module({
  imports: [
    //config
    // Configuration,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '/.env',
    }),
    // DB
    TypeOrmModule.forRoot(defaultTypeOrmOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
