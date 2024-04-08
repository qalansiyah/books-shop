import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/books.entity';
import { Order } from './orders/entities/orders.entity';
import { Author } from './books/entities/authors.entity';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Book, Order, Author],
      autoLoadModels: true,
    }),
    UsersModule,
    BooksModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
