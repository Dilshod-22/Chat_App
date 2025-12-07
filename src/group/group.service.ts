import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { GroupDocument, Group } from "./group_schema";
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GroupService {
    private readonly logger = new Logger(GroupService.name);
    constructor(
        @InjectModel(Group.name) private groupModel: Model<GroupDocument>
    ) { }

    async getAllGroups() {
        const groups = await this.groupModel.find();
        return groups;
    }

    async createGroup(groupData: Partial<Group>): Promise<Group> {
        try {
            const newGroup = new this.groupModel(groupData);
            return await newGroup.save();
        } catch (error) {
            if (error.code === 11000) {
                this.logger.warn(`Group with name "${groupData.name}" already exists.`);
                throw new ConflictException(`Group with name "${groupData.name}" already exists.`);
            }
            this.logger.error('Failed to create group', error.stack);
            throw new InternalServerErrorException('Failed to create group');
        }
    }

    async updateGroup(id: string, groupData: Partial<Group>): Promise<Group> {
        try {
            const updatedGroup = await this.groupModel.findByIdAndUpdate(
                id,
                groupData,
                { new: true, validators: true }
            );
            if (!updatedGroup) {
                this.logger.warn(`Group with name "${groupData.name}" not found.`);
                throw new ConflictException(`Group with name "${groupData.name}" not found.`);
            }
            return updatedGroup;
        } catch (error) {
            if (error.code === 11000) {
                this.logger.warn(`Group with name "${groupData.name}" already exists.`);
                throw new ConflictException(`Group with name "${groupData.name}" already exists.`);
            }
            this.logger.error('Failed to update group', error.stack);
            throw new InternalServerErrorException('Failed to update group');
        }
    }

    async recoveryGroup(id: string): Promise<Group> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                this.logger.warn(`Invalid group ID format: "${id}"`);
                throw new BadRequestException(`Invalid group ID format`);
            }

            const recoveryGroup = await this.groupModel.findByIdAndUpdate(
                id,
                { active: true },
                { new: true },
            );

            if (!recoveryGroup) {
                this.logger.warn(`Group with id "${id}" not found.`);
                throw new NotFoundException(`Group with id "${id}" not found.`);
            }

            this.logger.log(`Group with id "${id}" successfully recovered`);
            return recoveryGroup;

        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            this.logger.error(
                `Failed to recovery group with id "${id}": ${error.message}`,
                error.stack
            );
            throw new InternalServerErrorException('Failed to recovery group');
        }

    }

    async deleteGroup(id: string): Promise<Group> {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                this.logger.warn(`Invalid group ID format: "${id}"`);
                throw new BadRequestException(`Invalid group ID format`);
            }

            const deletedGroup = await this.groupModel.findByIdAndUpdate(
                id,
                { active: false },
                { new: true },
            );

            if (!deletedGroup) {
                this.logger.warn(`Group with id "${id}" not found.`);
                throw new NotFoundException(`Group with id "${id}" not found.`);
            }

            this.logger.log(`Group with id "${id}" successfully deleted`);
            return deletedGroup;

        } catch (error) {
            if (error instanceof NotFoundException || error instanceof BadRequestException) {
                throw error;
            }
            this.logger.error(
                `Failed to delete group with id "${id}": ${error.message}`,
                error.stack
            );
            throw new InternalServerErrorException('Failed to delete group');
        }

    }

    async deleteGroupForce(id: string): Promise<{ message: string; deletedGroup: Group }>  {
        try {
            const deleteGroup = await this.groupModel.findByIdAndDelete(id).exec();

            if (!deleteGroup) {
                this.logger.warn(`Group with id "${id}" not found.`);
                throw new NotFoundException(`Group with id "${id}" not found.`);
            }

            this.logger.log(`Group with id ${id} successfully delete (soft delete)`);
            
            return {
                message: 'Guruh butunlay o\'chirildi',
                deletedGroup: deleteGroup
            };  

        } catch (err) {
            this.logger.error(`Failed to delete group with id "${id}": ${err.message}`, err.stack);
            throw new Error("Failed to delete group");
        }
    }








}