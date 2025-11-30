import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group, SchemaGroup } from './group_schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupMemberController } from './group-member/group-member.controller';
import { GroupMemberService } from './group-member.service';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Group.name, schema: SchemaGroup }
    ]),
    MemberModule
  ],
  providers: [GroupService, GroupMemberService],
  controllers: [GroupController, GroupMemberController]
})
export class GroupModule {}
