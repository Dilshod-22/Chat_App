export class UserDto {
    nickname: string;
    email?: string;
    active: boolean;
    isEmailVerified: boolean;
    emailVerificationToken?: string
    phone_number ?: string;
    password: string;
    resetPasswordToken? : string;
    user_photo ?: string;
    createdAt: Date;
}


export class UserDto_id extends UserDto {
    id?: number;
}
