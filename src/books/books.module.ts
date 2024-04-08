import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/books.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.entity';
import { Order } from '../orders/entities/orders.entity';
import { Author } from './entities/authors.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [SequelizeModule.forFeature([Book, User, Order, Author])],
})
export class BooksModule {}
