import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from 'src/books/entities/authors.entity';
import { Book } from 'src/books/entities/books.entity';
import { OrderDto } from './dto/order.dto';
import { User } from 'src/users/entities/users.entity';
import { Order } from './entities/orders.entity';
import logger from 'src/logger';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Book) private bookRepository: typeof Book,
    @InjectModel(Author) private authorRepository: typeof Author,
    @InjectModel(Order) private orderRepository: typeof Order,
  ) {}

  generateOrderNumber(title: string, authorName: string): string {
    return title && authorName
      ? new Date().toISOString().replace(/\D/g, '').slice(-10)
      : undefined;
  }

  async add(dto: OrderDto) {
    try {
      let user = await this.userRepository.findOne({
        where: { email: dto.email },
      });

      if (!user) {
        user = await this.userRepository.create({
          email: dto.email,
        });
      }

      let author = await this.authorRepository.findOne({
        where: { authorName: dto.authorName },
      });

      if (!author) {
        author = await this.authorRepository.create({
          authorName: dto.authorName,
        });
      }

      const book = await this.bookRepository.create({
        title: dto.title,
        authorId: author.id,
      });

      const orderNumber = this.generateOrderNumber(dto.title, dto.authorName);

      const order = await this.orderRepository.create({
        id: dto.id,
        userId: dto.userId,
        bookId: book.bookId,
        orderNumber: orderNumber,
      });
      return order;
    } catch (error) {
      logger.error(`Ошибка при добавлении заказа: ${error.message}`);
      throw error;
    }
  }

  async findOrder(orderNumber: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { orderNumber },
      });
      return order;
    } catch (error) {
      logger.error(`Ошибка при поиске заказа: ${error.message}`);
      throw error;
    }
  }
}
