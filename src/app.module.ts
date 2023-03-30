import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { Question } from './question/entities/question.entity';
import { ConfigModule } from '@nestjs/config';
import { QuestionSubscriber } from './common/subscriber/QuestionSubscriber';

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
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   url: process.env.DATABASE_URL,
    //   entities: [ User, Question ],
    //   subscribers: [ QuestionSubscriber ],
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    AuthModule, 
    UserModule, 
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
