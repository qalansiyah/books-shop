import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import logger from 'src/logger';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(dto);
      return user;
    } catch (error) {
      logger.error(`Ошибка при создании пользователя: ${error.message}`);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      logger.error(`Ошибка при получении пользователей: ${error.message}`);
      throw error;
    }
  }
}
