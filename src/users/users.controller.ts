import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import logger from 'src/logger';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(userDto);
      return user;
    } catch (error) {
      logger.error(`Ошибка при создании пользователя: ${error.message}`);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getAll() {
    try {
      const users = await this.userService.getAllUsers();
      return users;
    } catch (error) {
      logger.error(`Пользователь не найден: ${error.message}`);
      throw error;
    }
  }
}
