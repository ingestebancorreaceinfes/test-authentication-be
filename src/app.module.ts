import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { QuestionSubscriber } from './question/subscriber/QuestionSubscriber';
import { Question } from './question/entities/question.entity';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { MongoDB } from 'winston-mongodb';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Ec1007256470',
    database: 'nest_db',
    entities: [ User, Question ],
    subscribers: [ QuestionSubscriber ],
    autoLoadEntities: true,
    synchronize: true
  }),
  WinstonModule.forRoot({
    transports: [
      new transports.File({
        // dirname: './../log/debug/', //path to where save loggin result 
        filename: 'info.log', //name of file where will be saved logging result
        level: 'info',
        format: format.combine(format.timestamp(), format.json()),
        
      }),
      new MongoDB({
        level: 'info',
        db: 'mongodb+srv://Tatiana:Mnbv9874@proyecto.vaxnwo8.mongodb.net/test?retryWrites=true&w=majority',
        options: {
          useUnifiedTopology : true
        },
        collection: 'log',
        format: format.combine(format.timestamp(), format.json())
      })
    ],
  }),
  AuthModule, 
  UserModule, 
  QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
