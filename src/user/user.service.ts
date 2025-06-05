import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntitiy } from 'src/db/entities/user-entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private manager: EntityManager;
  constructor(@Inject('DataSource') private dataSource: DataSource) {
    this.manager = this.dataSource.manager;
  }
  //create user
  async createUser(data: CreateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntitiy, {
        email: data.email,
      });
      if (user) {
        throw new Error('User already exists with this email');
      }
      const createUser = await this.manager.create(UserEntitiy, {
        email: data.email,
        name: data.name,
        password: data.password,
        mobile: data.mobile,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
      });

      await this.manager.save(UserEntitiy, createUser);

      return { message: 'user created successfully', createUser };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new NotFoundException(`${error.message}`);
    }
  }

  //update user
  async updateUser(id: string, data: UpdateUserDto) {
    try {
      const user = await this.manager.findOneBy(UserEntitiy, { id });
      if (!user) {
        throw new Error('User not found');
      }
      const updatedUser = await this.manager.merge(UserEntitiy, user, data);
      await this.manager.save(UserEntitiy, updatedUser);
      return { message: 'User updated successfully', data: updatedUser };
    } catch (error) {
      console.error('Error updating user:', error);
      throw new NotFoundException(`${error.message}`);
    }
  }

  //delete user
  async deleteUser(id: string) {
    try {
      const user = await this.manager.findOneBy(UserEntitiy, { id });
      if (!user) {
        throw new Error('User not found');
      }
      await this.manager.delete(UserEntitiy, { id });
      return 'Deleted user successfully';
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new NotFoundException(`${error.message}`);
    }
  }
  //getAll users
  async getAllUsers() {
    try {
      const users = await this.manager.find(UserEntitiy);
      if (!users || users.length === 0) {
        throw new Error('No users found');
      }
      return { message: 'Users returned successfully', data: users };
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new NotFoundException(`${error.message}`);
    }
  }
  //get user by id
  async getUserById(id: string) {
    try {
      const user = await this.manager.findOneBy(UserEntitiy, { id });
      if (!user) {
        throw new Error('User not found');
      }
      return { message: 'User returned successfully', data: user };
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new NotFoundException(`${error.message}`);
    }
  }
}
