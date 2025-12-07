import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group, SchemaGroup } from './group_schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMemberController } from './member/member.controller';
import { GroupMemberService } from './member/member.service';
import { GroupMemberModule } from './member/member.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Group.name, schema: SchemaGroup }
    ]),
    GroupMemberModule
  ],
  providers: [GroupService, GroupMemberService],
  controllers: [GroupController, GroupMemberController]
})
export class GroupModule {}
