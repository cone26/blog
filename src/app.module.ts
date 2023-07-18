import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { defaultTypeOrmOptions } from './libs/common/typeorm-module.options'
import { Configuration } from './blog/config/configuration'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    //config
    // Configuration,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // DB
    TypeOrmModule.forRoot(defaultTypeOrmOptions)
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
