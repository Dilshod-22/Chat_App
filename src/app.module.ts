import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupModule } from './group/group.module';
import { GroupMemberController } from './group-member/group-member.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Discord'),
    UserModule,
    GroupModule,
  ],
  controllers: [AppController, GroupMemberController],
  providers: [AppService],
})
export class AppModule {}
