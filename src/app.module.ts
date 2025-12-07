import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from './group/group.module';
import { GroupMemberModule } from './group/member/member.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Discord'),
    UserModule,
    GroupModule,
    GroupMemberModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
