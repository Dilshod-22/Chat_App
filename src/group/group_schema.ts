import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GroupDocument = HydratedDocument<Group>;

@Schema({ collection: 'groups' })
export class Group{
    @Prop({required: true,unique: true})
    name: string;

    @Prop({required: true,default: Date.now})
    createdAt: Date;

    @Prop({required: true,ref: 'User'})
    createdBy: String;

    @Prop({default: true})
    active: boolean;

    @Prop({required: true, ref: 'User'})
    ownerId: string;

    @Prop()
    description?: string;

    @Prop()
    group_photo?: string;
}

export const SchemaGroup = SchemaFactory.createForClass(Group);