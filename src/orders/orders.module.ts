import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from 'src/books/entities/authors.entity';
import { Book } from 'src/books/entities/books.entity';
import { User } from 'src/users/entities/users.entity';
import { Order } from './entities/orders.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [SequelizeModule.forFeature([Book, User, Order, Author])],
})
export class OrdersModule {}
