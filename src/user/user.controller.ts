import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('createUser')
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Post('updateUser/:id')
  async updateUser(@Param() Param, @Body() data: UpdateUserDto) {
    return await this.userService.updateUser(Param.id, data);
  }

  @Delete('deleteUser/:id')
  async DeleteUser(@Param() param) {
    return await this.userService.deleteUser(param.id);
  }
  @Get('')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Get('/:id')
  async getUserById(@Param() param) {
    return await this.userService.getUserById(param.id);
  }
}
