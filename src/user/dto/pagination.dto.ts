import { IsOptional, IsInt, Min, Max, IsIn, IsString, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    isDeleted?: boolean = false;

    @IsOptional()
    @IsIn(['createdAt', 'email', 'nickname'])
    sortBy?: string = 'email';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'desc';

    @IsOptional()
    @Type(() => Date)
    startDate?: Date;

    @IsOptional()
    @Type(() => Date)
    endDate?: Date;
}