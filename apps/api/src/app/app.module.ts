import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { HabitsModule } from '../habits/habits.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    HabitsModule,
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
