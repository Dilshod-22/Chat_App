import { Module } from '@nestjs/common';
import { GroupMemberController } from './member.controller';
import { GroupMemberService } from './member.service';

@Module({
  imports:[],
  controllers: [GroupMemberController],
  providers: [GroupMemberService]
})
export class GroupMemberModule {}
