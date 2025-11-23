import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Req, ValidationPipe } from '@nestjs/common';
import { UserDto,UserDto_id } from './dto/user.dto';
import { UserService } from './user.service';
import { PaginationDto } from './dto/pagination.dto';

@Controller('user')
export class UserController {
    users: UserDto_id[];
    UserService: UserService;
    constructor(private readonly userService: UserService) {}

    @HttpCode(200)
    @Get("/")
    async getAllUsers(@Query() paginationDto: PaginationDto) {
        return await this.userService.getAllUsers(paginationDto);
    }

    @Get(":id")
    async getOneUser(@Param("id") id: string) {
        return this.userService.getUser(id);
    }

    @HttpCode(201)
    @Post("/")
    async createUser(@Body() userType: UserDto) {
        return this.userService.createUser(userType);
    }

    @HttpCode(201)
    @Put("/:id")
    async updateUser(@Param("id") id: string,  @Body() userType: UserDto) {
        return this.userService.updateuser(id, userType);
    }

    @HttpCode(201)
    @Put("/:id/activate")
    async activateUser(@Param("id") id: string ){
        return this.userService.activateUser(id);
    }

    @HttpCode(201)
    @Delete("/force/:id")
    async forceDeleteUser(@Param("id") id: string ){
        return this.userService.forceDeleteUser(id);
    }

    @HttpCode(201)
    @Delete("/:id")
    async deleteUser(@Param("id") id: string ){
        return this.userService.deleteUser(id);
    }


    
}
