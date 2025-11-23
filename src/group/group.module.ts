import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group, SchemaGroup } from './group_schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Group.name, schema: SchemaGroup }
    ])
  ],
  providers: [GroupService],
  controllers: [GroupController]
})
export class GroupModule {}
