import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as databaseConfig from './config.json';
import { RouterModule } from '@nestjs/core';
import { LabelModule } from './label/label.module';

@Module({
  imports: [
    MailModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [],
      autoLoadEntities: true,
      synchronize: databaseConfig.synchronize,
    }),
    RouterModule.register([
      {
        path: 'api',
        module: AppModule,
        children: [
          {
            path: 'mail',
            module: MailModule,
          },
        ],
      },
    ]),
    MailModule,
    LabelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
