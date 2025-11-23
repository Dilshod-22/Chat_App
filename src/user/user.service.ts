import { BadRequestException, ConflictException, Injectable, Logger  } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema'; 
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponse } from './dto/pagination.interface';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {} 

    async getAllUsers(paginationDto: PaginationDto): Promise<PaginatedResponse<User>> {
        const {
            page = 1,
            limit = 10,
            search,
            active=true,
            isDeleted,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = paginationDto;

        if (page < 1) {
            throw new BadRequestException('Page raqami 1 dan katta bo\'lishi kerak');
        }
        if (limit < 1 || limit > 100) {
            throw new BadRequestException('Limit 1 dan 100 gacha bo\'lishi kerak');
        }

        const filter: any = {};

        if (active !== undefined) {
            filter.active = active;
        }

        if (search && search.trim()) {
            filter.$or = [
                { email: { $regex: search.trim(), $options: 'i' } },
                { nickname: { $regex: search.trim(), $options: 'i' } },
                { phone_number: { $regex: search.trim(), $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        const sort: any = { };
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const [users, total] = await Promise.all([
            this.userModel
                .find(filter)
                .select('-password')
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean()
                .exec(),
            this.userModel.countDocuments(filter).exec()
        ]);

        const totalPages = Math.ceil(total / limit);
        const queryParams = new URLSearchParams();
        if (search) queryParams.set('search', search);
        if (active !== undefined) queryParams.set('active', String(active));
        if (isDeleted !== false) queryParams.set('isDeleted', String(isDeleted));
        if (sortBy !== 'createdAt') queryParams.set('sortBy', sortBy);
        if (sortOrder !== 'desc') queryParams.set('sortOrder', sortOrder);
        queryParams.set('limit', String(limit));

        this.logger.log(`Found ${users.length} users out of ${total} total`);

        return {
            data: users as User[],
            meta: {
                total,
                page,
                limit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    }

    async getUser(id: string): Promise<User[] | null> {
            const user = await this.userModel.findById(id).exec();
    
            if (!user) {
                throw new NotFoundException(`ID: ${id} bo'yicha foydalanuvchi topilmadi`);
            }else{
                // @ts-ignore
                return user;
            }       
    }

    async createUser(userInfo : UserDto): Promise<User> {
        const existingUser = await this.userModel.findOne({ email: userInfo.email });
        if (existingUser) {
            throw new ConflictException('Bu email allaqachon ro\'yxatdan o\'tgan');
        }

        const newUser = new this.userModel(userInfo);
        return await newUser.save();
    }

    async updateuser(id: string, updateData: Partial<UserDto>): Promise<User | any> {
        try {
            const user = await this.userModel
                .findByIdAndUpdate(
                    id,
                    updateData,
                    { new: true, runValidators: true, strict: 'throw' }
                )
                .select('-password')
                .exec();
            if (!user) {
                throw new NotFoundException(`User ID: ${id} topilmadi`);
            }
            return user;
        } catch (error) {
            if (error.name === 'StrictModeError') {
                throw new BadRequestException(`Noma'lum maydon(lar) mavjud: ${error.message}`);
            }
        }
    }

    async activateUser(id: string): Promise<User | any> {
        const user = await this.userModel
        .findByIdAndUpdate(
            id,
            { active: true },
            { new: true }
        )
        .select('-password')
        .exec();
    
        if (!user) {
            throw new NotFoundException(`User ID: ${id} topilmadi`);
        }
        
        return user;
    }

    async forceDeleteUser(id: string): Promise<{ message: string; deletedUser: User }> {
        const user = await this.userModel
            .findByIdAndDelete(id)
            .select('-password')
            .exec();
        
        if (!user) {
            throw new NotFoundException(`User ID: ${id} topilmadi`);
        }
        
        return {
            message: 'Foydalanuvchi butunlay o\'chirildi',
            deletedUser: user
        };
    }
    
    async deleteUser(id: string): Promise<User> {
        const user = await this.userModel
            .findByIdAndUpdate(
                id,
                { 
                    active: false
                },
                { new: true, runValidators: true }
            )
            .select('-password')
            .exec();
        
        if (!user) {
            throw new NotFoundException(`User ID: ${id} topilmadi`);
        }
        
        return user;
    }
    
}