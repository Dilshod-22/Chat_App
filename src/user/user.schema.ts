import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {


    @Prop({required: true})
    nickname: string;

    @Prop({ unique: true})
    email: string;

    @Prop({ default: true})
    active: boolean;

    @Prop({ default: false })
    isEmailVerified: boolean;

    @Prop()
    emailVerificationToken: string;

    @Prop()
    phone_number: string;

    @Prop()
    password: string;

    @Prop()
    resetPasswordToken: string;

    @Prop()
    user_photo: string;

    @Prop({default: Date.now})
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);