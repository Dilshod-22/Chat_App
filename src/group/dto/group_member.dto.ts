import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type groupMemberDocument = HydratedDocument<Group_member>;

@Schema({ collection: 'group_members' })
export class  Group_member{
    @Prop({required: true, ref: 'User'})
    userId: string;

    @Prop({required: true, ref: 'Group'})
    groupId: string;

    @Prop({required: true, enum: ['member', 'admin'], default: 'member'})
    role: 'member' | 'admin';

    @Prop({default: Date.now})
    joinedAt: Date;
}

export const groupmemberSchema = SchemaFactory.createForClass(Group_member);