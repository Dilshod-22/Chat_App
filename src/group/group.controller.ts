import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { group } from "./dto/group.dto";
import { GroupService } from './group.service';
import { isValidObjectId } from 'mongoose';



@Controller('group')
export class GroupController {
    GroupService: GroupService; 
    constructor(private readonly groupService: GroupService ){}

    @HttpCode(200)
    @Get("/")
    async getGroups() {
        return this.groupService.getAllGroups();
    }

    @HttpCode(200)
    @Post()
    async createGroup(@Body() groupData: group) {
        if (!isValidObjectId(groupData.ownerId)) {
            throw new BadRequestException('Invalid owner ID format');
        }
        if (!isValidObjectId(groupData.createdBy)) {
            throw new BadRequestException('Invalid creator ID format');
        }
        return this.groupService.createGroup(groupData);
    }

    @HttpCode(200)
    @Put(":id")
    async updateGroup(@Param("id") id: string,@Body() groupData: group) {
        return this.groupService.updateGroup(id,groupData);
    }

    @HttpCode(200)
    @Put("/recoveryGroup/:id")
    async recoveryGroup(@Param("id") id: string) {
        return this.groupService.recoveryGroup(id);
    }

    @HttpCode(200)
    @Delete(':id')
    async deleteGroup(@Param('id') id: string) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid group ID format');
        }
        return this.groupService.deleteGroup(id);
    }


    @HttpCode(200)
    @Delete('/force/:id')
    async deleteGroupForce(@Param('id') id: string) {
        if (!isValidObjectId(id)) {
            throw new BadRequestException('Invalid group ID format');
        }
        return this.groupService.deleteGroupForce(id);
    }
    
    

}
